package com.watchstore.userservice.config;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.SignatureException;
import io.jsonwebtoken.UnsupportedJwtException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import javax.crypto.spec.SecretKeySpec;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;
import java.security.Key;
import java.util.Base64;

@Component
public class JwtUtil {

    @Value("${jwt.secret}")
    private String secret;

    @Value("${jwt.expiration}")
    private Long expiration;

    private Key key;

    private Key getSigningKey() {
        if (key == null) {
            // Dùng secret trực tiếp từ application.properties
            System.out.println("Creating signing key with secret: " + secret);
            byte[] keyBytes = secret.getBytes();
            key = new SecretKeySpec(keyBytes, SignatureAlgorithm.HS256.getJcaName());
        }
        return key;
    }

    public String extractUsername(String token) {
        try {
            return extractClaim(token, Claims::getSubject);
        } catch (Exception e) {
            System.err.println("Error extracting username: " + e.getMessage());
            return null;
        }
    }

    public String extractRole(String token) {
        try {
            final Claims claims = extractAllClaims(token);
            return claims.get("role", String.class);
        } catch (Exception e) {
            System.err.println("Error extracting role: " + e.getMessage());
            return null;
        }
    }

    public Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    private Claims extractAllClaims(String token) {
        return Jwts.parser()
                .setSigningKey(getSigningKey())
                .parseClaimsJws(token)
                .getBody();
    }

    private Boolean isTokenExpired(String token) {
        try {
            return extractExpiration(token).before(new Date());
        } catch (Exception e) {
            System.err.println("Error checking token expiration: " + e.getMessage());
            return true;
        }
    }

    public String generateToken(String username, String role) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("role", role);
        return createToken(claims, username);
    }

    private String createToken(Map<String, Object> claims, String subject) {
        System.out.println("Creating token for user: " + subject + " with role: " + claims.get("role"));
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(subject)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + expiration * 1000))
                .signWith(SignatureAlgorithm.HS256, getSigningKey())
                .compact();
    }

    public boolean isTokenValid(String token) {
        try {
            System.out.println("Validating token...");
            Jwts.parser().setSigningKey(getSigningKey()).parseClaimsJws(token);
            boolean notExpired = !isTokenExpired(token);
            System.out.println("Token is" + (notExpired ? " valid" : " expired"));
            return notExpired;
        } catch (SignatureException e) {
            System.err.println("JWT validation error: Invalid signature - " + e.getMessage());
            return false;
        } catch (MalformedJwtException e) {
            System.err.println("JWT validation error: Malformed JWT - " + e.getMessage());
            return false;
        } catch (ExpiredJwtException e) {
            System.err.println("JWT validation error: Expired JWT - " + e.getMessage());
            return false;
        } catch (UnsupportedJwtException e) {
            System.err.println("JWT validation error: Unsupported JWT - " + e.getMessage());
            return false;
        } catch (IllegalArgumentException e) {
            System.err.println("JWT validation error: Invalid argument - " + e.getMessage());
            return false;
        } catch (Exception e) {
            System.err.println("JWT validation error: " + e.getMessage());
            e.printStackTrace();
            return false;
        }
    }

    public Boolean validateToken(String token, UserDetails userDetails) {
        try {
            final String username = extractUsername(token);
            return (username != null && username.equals(userDetails.getUsername()) && !isTokenExpired(token));
        } catch (Exception e) {
            System.err.println("Token validation error: " + e.getMessage());
            return false;
        }
    }
}
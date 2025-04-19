package com.watchstore.userservice.config;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

import java.io.IOException;

public class JwtAuthenticationFilter extends BasicAuthenticationFilter {

    private final JwtUtil jwtUtil;
    private final UserDetailsService userDetailsService;

    public JwtAuthenticationFilter(AuthenticationManager authenticationManager, JwtUtil jwtUtil, UserDetailsService userDetailsService) {
        super(authenticationManager);
        this.jwtUtil = jwtUtil;
        this.userDetailsService = userDetailsService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
            throws IOException, ServletException {

        System.out.println("JwtAuthenticationFilter: Processing request to " + request.getRequestURI());

        String header = request.getHeader("Authorization");

        // Log để debug
        System.out.println("Authorization header: " + header);

        if (header == null || !header.startsWith("Bearer ")) {
            System.out.println("No Bearer token found");
            chain.doFilter(request, response);
            return;
        }

        // Xử lý trường hợp token có dấu ngoặc nhọn {}
        String token = header.substring(7).trim();
        if (token.startsWith("{") && token.endsWith("}")) {
            token = token.substring(1, token.length() - 1);
            System.out.println("Removed curly braces from token");
        }

        try {
            if (!jwtUtil.isTokenValid(token)) {
                System.out.println("Token is invalid");
                chain.doFilter(request, response);
                return;
            }

            String username = jwtUtil.extractUsername(token);
            System.out.println("Extracted username from token: " + username);

            if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                try {
                    UserDetails userDetails = userDetailsService.loadUserByUsername(username);
                    System.out.println("Loaded user details: " + userDetails.getUsername() + ", authorities: " + userDetails.getAuthorities());

                    UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(
                            userDetails, null, userDetails.getAuthorities());
                    SecurityContextHolder.getContext().setAuthentication(auth);
                    System.out.println("Authentication set in security context");
                } catch (Exception e) {
                    System.err.println("Error loading user details: " + e.getMessage());
                }
            }
        } catch (Exception e) {
            System.err.println("Error processing JWT: " + e.getMessage());
            e.printStackTrace();
        }

        chain.doFilter(request, response);
    }
}

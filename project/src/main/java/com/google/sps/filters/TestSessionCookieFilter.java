package com.google.sps.filters;

import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.FirebaseToken;
import java.io.IOException;
import java.util.logging.Logger;
import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class TestSessionCookieFilter implements Filter {

    private FilterConfig filterConfig;
    private static final Logger log = Logger.getLogger(TestSessionCookieFilter.class.getName());

    private FirebaseToken getFirebaseToken(HttpServletRequest request) {
        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if ("firebase_session".equals(cookie.getName())) {
                    String sessionCookie = cookie.getValue();
                    try {
                        return FirebaseAuth.getInstance()
                            .verifySessionCookie(sessionCookie, true);
                    } catch (FirebaseAuthException e) {
                        log.warning("failed to decode session cookie");
                        return null;
                    } catch (IllegalArgumentException e) {
                        // cookie is null or empty
                        return null;
                    }
                }
            }
        }

        return null;
    }

    public void doFilter(ServletRequest req, ServletResponse res, FilterChain filterChain)
        throws IOException, ServletException {
        HttpServletRequest request = (HttpServletRequest) req; // TODO: error check here
        FirebaseToken token = getFirebaseToken(request);

        if (token != null) {
            log.info(request.getRequestURL() + ": Decoded email: " + token.getEmail());
            filterChain.doFilter(request, res);
        } else {
            HttpServletResponse response = (HttpServletResponse) res;
            response.sendError(401, "Invalid session cookie");
        }
    }

    public FilterConfig getFilterConfig() {
        return filterConfig;
    }

    public void init(FilterConfig filterConfig) {
        this.filterConfig = filterConfig;
    }

    public void destroy() {}

}

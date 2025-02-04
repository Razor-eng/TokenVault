import { motion } from 'framer-motion';
import CodeWindow from '../components/CodeWindow';

const SpringBootJWT = () => {
  const dependenciesCode = `<dependencies>
    <dependency>
        <groupId>io.jsonwebtoken</groupId>
        <artifactId>jjwt-api</artifactId>
        <version>0.11.5</version>
    </dependency>
    <dependency>
        <groupId>io.jsonwebtoken</groupId>
        <artifactId>jjwt-impl</artifactId>
        <version>0.11.5</version>
        <scope>runtime</scope>
    </dependency>
</dependencies>`;

  const jwtUtilCode = `@Component
public class JwtUtil {
    @Value("\${jwt.secret}")
    private String secret;

    public String generateToken(UserDetails userDetails) {
        Map<String, Object> claims = new HashMap<>();
        return createToken(claims, userDetails.getUsername());
    }

    private String createToken(Map<String, Object> claims, String subject) {
        return Jwts.builder()
            .setClaims(claims)
            .setSubject(subject)
            .setIssuedAt(new Date(System.currentTimeMillis()))
            .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 10))
            .signWith(SignatureAlgorithm.HS256, secret)
            .compact();
    }

    public Boolean validateToken(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }
}`;

  const filterCode = `@Component
public class JwtRequestFilter extends OncePerRequestFilter {
    @Autowired
    private JwtUtil jwtUtil;
    
    @Autowired
    private UserDetailsService userDetailsService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, 
            HttpServletResponse response, FilterChain chain)
            throws ServletException, IOException {
        
        final String authorizationHeader = 
            request.getHeader("Authorization");

        String username = null;
        String jwt = null;

        if (authorizationHeader != null && 
            authorizationHeader.startsWith("Bearer ")) {
            jwt = authorizationHeader.substring(7);
            username = jwtUtil.extractUsername(jwt);
        }

        if (username != null && 
            SecurityContextHolder.getContext()
                .getAuthentication() == null) {
            UserDetails userDetails = 
                userDetailsService.loadUserByUsername(username);

            if (jwtUtil.validateToken(jwt, userDetails)) {
                UsernamePasswordAuthenticationToken token = 
                    new UsernamePasswordAuthenticationToken(
                        userDetails, null, 
                        userDetails.getAuthorities()
                    );
                SecurityContextHolder.getContext()
                    .setAuthentication(token);
            }
        }
        chain.doFilter(request, response);
    }
}`;

  const securityConfigCode = `@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {
    @Autowired
    private JwtRequestFilter jwtRequestFilter;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.csrf().disable()
            .authorizeRequests()
            .antMatchers("/auth/**").permitAll()
            .anyRequest().authenticated()
            .and()
            .sessionManagement()
            .sessionCreationPolicy(SessionCreationPolicy.STATELESS);
        
        http.addFilterBefore(jwtRequestFilter, 
            UsernamePasswordAuthenticationFilter.class);
    }
}`;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
    >
      <motion.div variants={itemVariants} className="text-center mb-12">
        <h1 className="text-4xl font-display font-bold mb-4 gradient-text">
          JWT Implementation in Spring Boot
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          A comprehensive guide to implementing JWT authentication in your Spring Boot applications
        </p>
      </motion.div>

      <div className="space-y-12">
        <motion.section variants={itemVariants}>
          <h2 className="text-2xl font-display font-semibold mb-6">Dependencies</h2>
          <p className="text-gray-600 mb-4">Add the following dependencies to your pom.xml:</p>
          <CodeWindow
            title="pom.xml"
            language="xml"
            code={dependenciesCode}
          />
        </motion.section>

        <motion.section variants={itemVariants}>
          <h2 className="text-2xl font-display font-semibold mb-6">JWT Utility Class</h2>
          <p className="text-gray-600 mb-4">Create a JWT utility class to handle token operations:</p>
          <CodeWindow
            title="JwtUtil.java"
            language="java"
            code={jwtUtilCode}
          />
        </motion.section>

        <motion.section variants={itemVariants}>
          <h2 className="text-2xl font-display font-semibold mb-6">JWT Filter</h2>
          <p className="text-gray-600 mb-4">Implement the JWT filter to process tokens:</p>
          <CodeWindow
            title="JwtRequestFilter.java"
            language="java"
            code={filterCode}
          />
        </motion.section>

        <motion.section variants={itemVariants}>
          <h2 className="text-2xl font-display font-semibold mb-6">Security Configuration</h2>
          <p className="text-gray-600 mb-4">Configure Spring Security to use JWT:</p>
          <CodeWindow
            title="SecurityConfig.java"
            language="java"
            code={securityConfigCode}
          />
        </motion.section>

        <motion.section variants={itemVariants} className="bg-white p-8 rounded-xl shadow-lg">
          <h2 className="text-2xl font-display font-semibold mb-6">Best Practices</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="p-6 bg-gradient-to-br from-indigo-50 to-white rounded-lg"
            >
              <h3 className="text-lg font-semibold mb-4">Security</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Use environment variables for secrets</li>
                <li>• Implement proper error handling</li>
                <li>• Set appropriate token expiration</li>
                <li>• Use HTTPS in production</li>
              </ul>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="p-6 bg-gradient-to-br from-purple-50 to-white rounded-lg"
            >
              <h3 className="text-lg font-semibold mb-4">Implementation</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Implement refresh token mechanism</li>
                <li>• Handle token revocation</li>
                <li>• Use proper exception handling</li>
                <li>• Validate token claims</li>
              </ul>
            </motion.div>
          </div>
        </motion.section>
      </div>
    </motion.div>
  );
};

export default SpringBootJWT;
package cn.bgsys.webapp.config;

import cn.bgsys.webapp.context.CrossDomainFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.core.annotation.Order;
import org.springframework.core.env.Environment;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.web.access.intercept.FilterSecurityInterceptor;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

@Profile("dev")
@Configuration
@Order(2)
public class DevSecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private Environment env;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .authorizeRequests()
                .antMatchers("/**").authenticated()
                .anyRequest().permitAll()
                .and()
                .formLogin()
                .permitAll()
                .and()
                .logout()
                .logoutRequestMatcher(new AntPathRequestMatcher("/logout"))
                .and()
                .headers()
                .frameOptions()
                .sameOrigin();
        http.addFilterBefore(new CrossDomainFilter(), FilterSecurityInterceptor.class).csrf()
                .disable();
//                .ignoringAntMatchers("/benchmarks/edit/**","/tasks/**","/taskreporting/**","/channel/edit/**");
    }

    @Autowired
    public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
        auth
                .inMemoryAuthentication()
                .withUser(env.getProperty("login.username","admin")).password(env.getProperty("login.password","admin")).roles("ADMIN");
    }

}

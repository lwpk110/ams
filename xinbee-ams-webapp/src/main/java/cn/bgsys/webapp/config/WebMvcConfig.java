package cn.bgsys.webapp.config;

import cn.bgsys.admin.web.controller.IndexController;
import cn.bgsys.admin.web.tool.StringToDatetimeConverter;
import cn.bgsys.webapp.context.CrossDomainFilter;
import cn.tendata.bgsys.xinbee.XinbeeApiAccessManager;
import cn.tendata.bgsys.xinbee.XinbeeApiAccessManagerImpl;
import cn.tendata.bgsys.xinbee.api.MarkApiAccessManager;
import cn.tendata.bgsys.xinbee.api.MarkApiAccessManagerImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;
import org.springframework.format.FormatterRegistry;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;
import org.thymeleaf.spring4.view.ThymeleafViewResolver;

import java.util.HashMap;
import java.util.Map;


@Configuration
@ComponentScan(basePackageClasses = IndexController.class)
public class WebMvcConfig extends WebMvcConfigurerAdapter {

//    public static final String LINK_ACCOUNTS_ROOT = "link.accounts.root";

    @Autowired
    private Environment env;

    @Autowired
    public void setThymeleafViewResolver(ThymeleafViewResolver thymeleafViewResolver) {
        Map<String, String> vars = new HashMap<String, String>();
//        vars.put("LINK_ACCOUNTS_ROOT", env.getRequiredProperty(LINK_ACCOUNTS_ROOT));
        thymeleafViewResolver.setStaticVariables(vars);
    }
    
    @Bean
    public CrossDomainFilter crossDomainFilter(){
        return new CrossDomainFilter();
    }

    @Bean
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }

    @Bean
    public XinbeeApiAccessManager xinbeeApiAccessManager(){
        return new XinbeeApiAccessManagerImpl();
    }

    @Bean
    public MarkApiAccessManager markApiAccessManager(){
        return new MarkApiAccessManagerImpl();
    }
    @Override
    public void addFormatters(FormatterRegistry registry) {
        registry.addConverter(new StringToDatetimeConverter());
    }


    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**");
    }

}

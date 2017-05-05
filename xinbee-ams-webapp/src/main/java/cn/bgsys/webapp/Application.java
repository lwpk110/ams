package cn.bgsys.webapp;


import cn.tendata.bgsys.config.UrlApiPropertiesConfig;
import cn.tendata.bgsys.service.MailDeliveryTaskService;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.boot.context.web.SpringBootServletInitializer;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;


@SpringBootApplication
@EnableCaching(order = 0)
@EnableConfigurationProperties
public class Application extends SpringBootServletInitializer {

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }

    @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
        return application.sources(Application.class);
    }

    @Configuration
    @ComponentScan(basePackageClasses = {MailDeliveryTaskService.class})
    static class ServiceConfig {
    }

    @Configuration
    @Import({UrlApiPropertiesConfig.class})
    static class SysConfig{

    }
}

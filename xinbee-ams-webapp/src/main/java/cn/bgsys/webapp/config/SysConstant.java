package cn.bgsys.webapp.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;

import javax.annotation.PostConstruct;

/**
 * Created by jeashi on 2017/3/31.
 */
@Configuration
public class SysConstant {

    public static final String LINK_SCS_ROOT = "link.scs.root";
    public static final String LINK_RCS_ROOT = "link.rcs.root";

    @Autowired
    private Environment env;
    public  @PostConstruct void init() {

    }

}

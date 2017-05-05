package cn.bgsys.webapp.context;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.common.base.Splitter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;

import javax.servlet.*;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

/**
 * Created by jeashi on 2016/10/25.
 */
@WebFilter(filterName = "crossDomainFilter", urlPatterns = "/**")
public class CrossDomainFilter implements Filter {
    private final Logger logger = LoggerFactory.getLogger(this.getClass());
    private List<String> crossDomainPatterns;
    private final String initcrossDomainParameter = "/benchmarks/edit,/tasks,/channel/edit";

    @Autowired
    private Environment env;

    @Override
    public void destroy() {
    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        writeLogInfo(request, response);

        long startTime = System.currentTimeMillis();
        request.setAttribute("startTime", startTime);

        String url = ((HttpServletRequest) request).getRequestURI();
        if (this.matchCrossDomainPatterns(request.getServletContext().getContextPath(), url)) {
            logger.info("添加允许跨域！！！");
            ((HttpServletResponse) response).setHeader("Access-Control-Allow-Origin", "*");
            ((HttpServletResponse) response).setHeader("Access-Control-Allow-Methods", "POST");
            ((HttpServletResponse) response).setHeader("Access-Control-Max-Age", "1000");
            chain.doFilter(request, response);
        } else {
            chain.doFilter(request, response);
        }
    }

    @Override
    public void init(FilterConfig arg0) throws ServletException {
        this.crossDomainPatterns = Splitter.on(',').trimResults().omitEmptyStrings().splitToList(initcrossDomainParameter);
    }

    /**
     * @param contextpath
     * @param url
     * @return
     */
    public boolean matchCrossDomainPatterns(String contextpath, String url) {
        boolean isExist = false;
//        if (this.crossDomainPatterns != null) {
//            for (String prefix : this.crossDomainPatterns) {
//                if (url.startsWith(contextpath + prefix)) {
//                    logger.info(url + "通过");
//                    isExist = false;
//                    break;
//                }
//            }
//        }
        return isExist;
    }

    private void writeLogInfo(ServletRequest request, ServletResponse response) {
        HttpServletRequest httpServletRequest = (HttpServletRequest) request;
        String requestUrl = httpServletRequest.getRequestURI();
        String callMethod = httpServletRequest.getParameter("callMethod");
        String callVersion = httpServletRequest.getParameter("callVersion");
        String ip = "";
        String hardwareCode = httpServletRequest.getParameter("hardwareCode");
        String param = "";
        try {
//            ip = NetUtils.getIpAddr(httpServletRequest);
            param = new ObjectMapper().writeValueAsString(httpServletRequest.getParameterMap());
        } catch (Exception e) {
            e.printStackTrace();
        }
        logger.info(">>>>>>>{}, callMethod: {}, callVersion: {}, ip: {}, hardwareCode: {} \n param: {}", requestUrl, callMethod, callVersion, ip, hardwareCode, param);
    }
}

package cn.bgsys.admin.web.controller;

import cn.tendata.bgsys.config.UrlApiPropertiesConfig;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

/**
 * Created by SayId on 2017/4/7.
 */
@Controller
@RequestMapping("/taskreporting")
public class TaskReportingController {
    private final Logger log = LoggerFactory.getLogger(this.getClass());
    private final RestTemplate restTemplate;
    private final UrlApiPropertiesConfig urlApiPropertiesConfig;

    @Autowired
    public TaskReportingController(RestTemplate restTemplate, UrlApiPropertiesConfig urlApiPropertiesConfig) {
        this.restTemplate = restTemplate;
        this.urlApiPropertiesConfig = urlApiPropertiesConfig;
    }

    @RequestMapping(value = "/{serverKey}", method = RequestMethod.POST)
    public ResponseEntity<Map<String, String>> actionChannel(@PathVariable("serverKey") String serverKey) {
        String url = urlApiPropertiesConfig.invokeChannelUrl.replace("{serverKey}", serverKey);
        log.info(" begin to get channelInvoke  from remote, url [ " + url + " ]");
        String channelStats = restTemplate.postForObject(urlApiPropertiesConfig.invokeChannelUrl, null, String.class, serverKey);
        Map<String, String> result = new HashMap<>();
        result.put("success", "true");
        return new ResponseEntity<>(result, HttpStatus.OK);
    }
}

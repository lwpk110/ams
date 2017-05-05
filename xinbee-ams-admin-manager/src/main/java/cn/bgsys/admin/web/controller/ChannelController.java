package cn.bgsys.admin.web.controller;

import cn.bgsys.admin.web.model.ServiceResponse;
import cn.tendata.bgsys.config.UrlApiPropertiesConfig;
import cn.tendata.bgsys.service.MailDeliveryChannelService;
import cn.tendata.bgsys.xinbee.model.MailDeliveryChannelDto;
import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.client.RestTemplate;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


/**
 * Created by jeashi on 2017/3/9.
 */

@Controller
@RequestMapping("/channel")
public class ChannelController {
    private final Logger log = LoggerFactory.getLogger(this.getClass());
    private final RestTemplate restTemplate;
    private final MailDeliveryChannelService mailDeliveryChannelService;
    private final UrlApiPropertiesConfig urlApiProperties;


    @Autowired
    public ChannelController(RestTemplate restTemplate, MailDeliveryChannelService mailDeliveryChannelService, UrlApiPropertiesConfig urlApiProperties) {
        this.restTemplate = restTemplate;
        this.mailDeliveryChannelService = mailDeliveryChannelService;
        this.urlApiProperties = urlApiProperties;
    }

    @RequestMapping(value = "", method = RequestMethod.GET)
    public ResponseEntity<ServiceResponse> getAllUserFullMailDeliveryChannel() {
        List<MailDeliveryChannelDto> list = mailDeliveryChannelService.getAll();
        ServiceResponse serviceResponse = ServiceResponse.initServiceReponseSuccess();
        serviceResponse.put("list", list);
        return new ResponseEntity<>(serviceResponse, HttpStatus.OK);
    }

    @RequestMapping(value = "/quality", method = RequestMethod.GET)
    public ResponseEntity<JSONObject> getChannelQuality(@RequestParam("channels") String[] channels, @RequestParam("start") String dateTime) {

        String url = urlApiProperties.softBounceReport + "?channels=" + Arrays.toString(channels).replace("[", "").replace("]", "").replace(" ", "") + "&dateTime=" + dateTime;
        log.info(" begin to get ChannelReport stats from remote, url [ " + url + " ]");
        String channelQuality = restTemplate.getForObject(url, String.class);
        JSONObject jsob = JSON.parseObject(channelQuality);
        return new ResponseEntity<>(jsob, HttpStatus.OK);
    }


    @RequestMapping(value = "/list", method = RequestMethod.GET)
    public ResponseEntity<String> getAllChannel() {
        String url = urlApiProperties.GetChannelUrl;
        log.info(" begin to get all channel  from remote, url [ " + url + " ]");
        String channelQuality = restTemplate.getForObject(url, String.class);
        return new ResponseEntity<>(channelQuality, HttpStatus.OK);
    }


    @RequestMapping(value = "/edit", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public ResponseEntity<Map<String, String>> resend(@RequestBody MailDeliveryChannelDto mailDeliveryChannel) {
        mailDeliveryChannelService.editSave(mailDeliveryChannel);
        Map<String, String> result = new HashMap<>();
        result.put("success", "true");
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @RequestMapping(value = "/stats/report", method = RequestMethod.GET)
    public ResponseEntity<JSONObject> getChannelReportStats(@RequestParam("start") String start,
                                                            @RequestParam("end") String end,
                                                            @RequestParam(value = "channelCode", required = false) Integer channelCode) {
        String url = urlApiProperties.getChannelReportStatsUrl + "?start=" + start + "&end=" + end;
        if (null != channelCode) {
            url = url + "&channelCode=" + channelCode;
        }
        log.info(" begin to get ChannelReport stats from remote, url [ " + urlApiProperties.getChannelReportStatsUrl + " ]");
        String channelStats = restTemplate.getForObject(url, String.class);
        log.info(" ChannelReport stats result [ " + channelStats + " ]");
        JSONObject jsob = JSON.parseObject(channelStats);
        return new ResponseEntity<>(jsob, HttpStatus.OK);
    }

    @RequestMapping(value = "/stats/total", method = RequestMethod.GET)
    public ResponseEntity<String> getChannelTotalStats(@RequestParam("start") String start,
                                                       @RequestParam("end") String end,
                                                       @RequestParam(value = "channelCode", required = false) Integer channelCode) {
        String url = urlApiProperties.getChannelTotalStatsUrl + "?start=" + start + "&end=" + end;
        if (null != channelCode) {
            url = url + "&channelCode=" + channelCode;
        }
        log.info(" begin to get Channel total report stats from remote, url [ " + urlApiProperties.getChannelTotalStatsUrl + " ]");
        String channelTotalStats = restTemplate.getForObject(url, String.class);
        log.info(" Report that channel total stats result [ " + channelTotalStats + " ]");
        return new ResponseEntity<>(channelTotalStats, HttpStatus.OK);
    }

    @RequestMapping(value = "/stats/mail/quality", method = RequestMethod.GET)
    public ResponseEntity<String> getChannelQualityReportStats(@RequestParam("start") String start,
                                                               @RequestParam("end") String end,
                                                               @RequestParam(value = "channelCode", required = false) Integer channelCode) {
        String url = urlApiProperties.getChannelQualityStatsUrl + "?start=" + start + "&end=" + end;
        if (null != channelCode) {
            url = url + "&channelCode=" + channelCode;
        }
        log.info(" begin to get Channel total report stats from remote, url [ " + url + " ]");
        String channelQualityStats = restTemplate.getForObject(url, String.class);
        log.info(" Report that channel total stats result [ " + channelQualityStats + " ]");
        JSONObject jsob = JSON.parseObject(channelQualityStats);
        return new ResponseEntity<>(channelQualityStats, HttpStatus.OK);
    }


}

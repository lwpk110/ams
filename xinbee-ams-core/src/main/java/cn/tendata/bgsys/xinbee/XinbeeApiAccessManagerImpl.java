package cn.tendata.bgsys.xinbee;

import cn.tendata.bgsys.config.UrlApiPropertiesConfig;
import cn.tendata.bgsys.util.JsonUtils;
import cn.tendata.bgsys.xinbee.model.BenchMarksDto;
import cn.tendata.bgsys.xinbee.model.MailDeliveryChannelDto;
import cn.tendata.bgsys.xinbee.model.MailDeliveryTaskDto;
import cn.tendata.bgsys.xinbee.model.PageData;
import com.alibaba.fastjson.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.StringUtils;
import org.springframework.web.client.RestTemplate;

import java.util.Arrays;
import java.util.List;

/**
 * Created by minjay on 2017/3/15.
 */
public class XinbeeApiAccessManagerImpl implements XinbeeApiAccessManager {
    private final Logger log = LoggerFactory.getLogger(this.getClass());

    @Autowired
    private RestTemplate restTemplate;

    @Autowired
    private UrlApiPropertiesConfig urlApiPropertiesConfig;


    @Override
    public PageData<MailDeliveryTaskDto> getTasksByStatus(int page, int status) {
        String url = urlApiPropertiesConfig.tasksUrl + "?page=" + page + "&status=" + status;
        String result = restTemplate.getForObject(url, String.class);
        PageData data = null;
        if (!StringUtils.isEmpty(result)) {
            data = JsonUtils.deserialize(result, PageData.class);
        }
        return data;
    }

    @Override
    public void resend(String[] ids) {
        restTemplate.postForObject(handleUrl(urlApiPropertiesConfig.resendUrl, ids), null, String.class);
    }

    @Override
    public void cancel(String[] ids) {
        restTemplate.postForObject(handleUrl(urlApiPropertiesConfig.cancelUrl, ids), null, String.class);
    }

    private String handleUrl(String url, String[] ids) {
        return url + "?ids=" + Arrays.toString(ids).replace("[", "").replace("]", "");
    }

    @Override
    public List<MailDeliveryChannelDto> getListMailDeliveryChannel() {
        log.info(" begin to get all Channnel from remote, url [ " + urlApiPropertiesConfig.channelOfAll + " ]");
        String callBackresult = restTemplate.getForObject(urlApiPropertiesConfig.channelOfAll, String.class);
        log.info(" end get all Channnel  from remote , result [ " + callBackresult + " ]");
        if (!StringUtils.isEmpty(callBackresult)) {
            JSONObject jsonObject = JSONObject.parseObject(callBackresult);
            if (jsonObject.getBoolean("success") && jsonObject.containsKey("list")) {
                List<MailDeliveryChannelDto> mailDeliveryChannelDtoList = JSONObject.parseArray(jsonObject.getString("list"), MailDeliveryChannelDto.class);
                return mailDeliveryChannelDtoList;
            }
        }
        return null;
    }

    @Override
    public void editChannel(MailDeliveryChannelDto mailDeliveryChannelDto) {
        String result = restTemplate.postForObject(urlApiPropertiesConfig.editChannelUrl, mailDeliveryChannelDto, String.class);

    }

    @Override
    public PageData<BenchMarksDto> getBenchMarks(String key, int page, String sortType) {
        String url = urlApiPropertiesConfig.getBenchMarksUrl +  "?page=" + page;
        if(!StringUtils.isEmpty(key)){
            url += "&keyword=" + key;
        }
        if(null != sortType)
        {
            url += "&sortType=" + sortType;
        }
        String result = restTemplate.getForObject(url, String.class);
        PageData data = null;
        if (!StringUtils.isEmpty(result)) {
            data = JsonUtils.deserialize(result, PageData.class);
        }
        return data;
    }

    @Override
    public void addBenchMarks(BenchMarksDto benchMarksDto) {
        restTemplate.postForObject(urlApiPropertiesConfig.addBenchMarksUrl, benchMarksDto, Void.class);
    }

    @Override
    public void editBenchMarks(BenchMarksDto benchMarksDto, String id) {
        String url = urlApiPropertiesConfig.editBenchMarksUrl.replace("{id}", id);
        restTemplate.postForObject(url, benchMarksDto, Void.class);
    }

    @Override
    public void deleteBenchMarks(String id) {
        String url = urlApiPropertiesConfig.deleteBenchMarksUrl.replace("{id}", id);
        restTemplate.delete(url);
    }
}

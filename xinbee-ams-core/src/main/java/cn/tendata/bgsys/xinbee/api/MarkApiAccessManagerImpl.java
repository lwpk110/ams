package cn.tendata.bgsys.xinbee.api;

import cn.tendata.bgsys.config.UrlApiPropertiesConfig;
import cn.tendata.bgsys.util.JsonUtils;
import cn.tendata.bgsys.xinbee.model.MarkDetailsDto;
import cn.tendata.bgsys.xinbee.model.MarkLogDto;
import cn.tendata.bgsys.xinbee.model.PageData;
import java.util.List;
import org.joda.time.DateTime;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.StringUtils;
import org.springframework.web.client.RestTemplate;

/**
 * Created by SayId on 2017/4/17.
 */
public class MarkApiAccessManagerImpl implements MarkApiAccessManager {
    private final Logger log = LoggerFactory.getLogger(this.getClass());

    @Autowired
    private RestTemplate restTemplate;

    @Autowired
    private UrlApiPropertiesConfig urlApiPropertiesConfig;


    @Override
    public PageData<MarkLogDto> getMarkLog(DateTime start, DateTime end, int page, String title, String taskId, Boolean status) {
        String url = urlApiPropertiesConfig.marksLogUrl + "?page=" + page + "&title=" + title + "&taskId=" + taskId;
        if(null != start){
            url += "&start=" + start ;
        }
        if(null != end){
            url += "&end=" + end ;
        }
        if (null != status) {
            url += "&status=" + status;
        }
        String result = restTemplate.getForObject(url, String.class);
        PageData data = null;
        if (!StringUtils.isEmpty(result)) {
            data = JsonUtils.deserialize(result, PageData.class);
        }
        return data;
    }

    @Override
    public List<MarkDetailsDto> getMarkDetails(String scoreTemplateId) {
        String url = urlApiPropertiesConfig.marksLogDetailsUrl.replace("{id}", scoreTemplateId);
        String result = restTemplate.getForObject(url, String.class);
        List data = null;
        if (!StringUtils.isEmpty(result)) {
            data = JsonUtils.deserialize(result, List.class);
        }
        return data;
    }
}

package cn.tendata.bgsys.xinbee.api;

import cn.tendata.bgsys.xinbee.model.MarkDetailsDto;
import cn.tendata.bgsys.xinbee.model.MarkLogDto;
import cn.tendata.bgsys.xinbee.model.PageData;
import org.joda.time.DateTime;

import java.util.List;

/**
 * Created by SayId on 2017/4/17.
 */
public interface MarkApiAccessManager {
    PageData<MarkLogDto> getMarkLog(DateTime startDate, DateTime endDate, int page, String title, String taskId, Boolean status);

    List<MarkDetailsDto> getMarkDetails(String scoreTemplateId);
}

package cn.tendata.bgsys.service;

import cn.tendata.bgsys.xinbee.api.MarkApiAccessManager;
import cn.tendata.bgsys.xinbee.model.MarkDetailsDto;
import cn.tendata.bgsys.xinbee.model.MarkLogDto;
import cn.tendata.bgsys.xinbee.model.PageData;
import org.joda.time.DateTime;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by SayId on 2017/4/17.
 */
@Service
public class MarkLogServiceImpl implements MarkLogService {

    private final MarkApiAccessManager markApiAccessManager;

    @Autowired
    public MarkLogServiceImpl(MarkApiAccessManager markApiAccessManager) {
        this.markApiAccessManager = markApiAccessManager;
    }

    @Override
    public PageData<MarkLogDto> getMarkLog(DateTime startDate, DateTime endDate, int page, String title, String taskId, Boolean status) {
        return markApiAccessManager.getMarkLog(startDate, endDate, page, title, taskId, status);
    }

    @Override
    public List<MarkDetailsDto> getMarkDetails(String scoreTemplateId) {
        return markApiAccessManager.getMarkDetails(scoreTemplateId);
    }
}

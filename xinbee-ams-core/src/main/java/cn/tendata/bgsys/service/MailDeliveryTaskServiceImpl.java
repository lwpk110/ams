package cn.tendata.bgsys.service;

import cn.tendata.bgsys.xinbee.XinbeeApiAccessManager;
import cn.tendata.bgsys.xinbee.model.MailDeliveryTaskDto;
import cn.tendata.bgsys.xinbee.model.PageData;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MailDeliveryTaskServiceImpl implements MailDeliveryTaskService {

    private final XinbeeApiAccessManager apiAccessManager;


    @Autowired
    public MailDeliveryTaskServiceImpl(XinbeeApiAccessManager apiAccessManager) {
        this.apiAccessManager = apiAccessManager;
    }

    @Override
    public PageData<MailDeliveryTaskDto> getTasksByStatus(int page, int status) {
        return apiAccessManager.getTasksByStatus(page,status);
    }

    @Override
    public void resend(String[] ids) {
        apiAccessManager.resend(ids);
    }

    @Override
    public void cancel(String[] ids) {
        apiAccessManager.cancel(ids);
    }
}

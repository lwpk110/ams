package cn.tendata.bgsys.service;


import cn.tendata.bgsys.xinbee.model.MailDeliveryTaskDto;
import cn.tendata.bgsys.xinbee.model.PageData;

public interface MailDeliveryTaskService {

    PageData<MailDeliveryTaskDto> getTasksByStatus(int page, int status);

    void resend(String[] ids);

    void cancel(String[] ids);


}

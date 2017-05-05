package cn.tendata.bgsys.service;

import cn.tendata.bgsys.xinbee.XinbeeApiAccessManager;
import cn.tendata.bgsys.xinbee.model.MailDeliveryChannelDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by SayId on 2017/3/22.
 */
@Service
public class MailDeliveryChannelServiceImpl implements MailDeliveryChannelService {
    private final XinbeeApiAccessManager apiAccessManager;

    @Autowired
    public MailDeliveryChannelServiceImpl(XinbeeApiAccessManager apiAccessManager){
        this.apiAccessManager = apiAccessManager;
    }

    @Override
    public List<MailDeliveryChannelDto> getAll() {
        return apiAccessManager.getListMailDeliveryChannel();
    }

    @Override
    public void editSave(MailDeliveryChannelDto mailDeliveryChannelDto) {
        apiAccessManager.editChannel(mailDeliveryChannelDto);
    }
}

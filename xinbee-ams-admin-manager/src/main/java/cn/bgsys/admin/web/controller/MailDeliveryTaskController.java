package cn.bgsys.admin.web.controller;

import cn.bgsys.admin.web.model.ServiceResponse;
import cn.tendata.bgsys.service.MailDeliveryTaskService;
import cn.tendata.bgsys.xinbee.model.MailDeliveryTaskDto;
import cn.tendata.bgsys.xinbee.model.PageData;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

/**
 * Created by minjay on 2017/3/16.
 */
@Controller
@RequestMapping("/tasks")
public class MailDeliveryTaskController {

    private final MailDeliveryTaskService mailDeliveryTaskService;


    @Autowired
    public MailDeliveryTaskController(MailDeliveryTaskService mailDeliveryTaskService) {
        this.mailDeliveryTaskService = mailDeliveryTaskService;
    }

    @RequestMapping(value = "", method = RequestMethod.GET)
    public ResponseEntity<PageData<MailDeliveryTaskDto>> getTasksByStatus(@RequestParam(value = "page", defaultValue = "0") int page,
                                                                          @RequestParam(value = "status", required = false) int status) {
        PageData<MailDeliveryTaskDto> result = mailDeliveryTaskService.getTasksByStatus(page, status);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @RequestMapping(value = "/resend", method = RequestMethod.GET)
    public ResponseEntity<?> resend(@RequestParam("ids") String[] ids) {
           mailDeliveryTaskService.resend(ids);
        ServiceResponse response = ServiceResponse.initServiceReponseSuccess();
        return new ResponseEntity<>(response,HttpStatus.OK);
    }

    @RequestMapping(value = "/cancel", method = RequestMethod.GET)
    public ResponseEntity<?> cancel(@RequestParam("ids") String[] ids) {
        mailDeliveryTaskService.cancel(ids);
        ServiceResponse response = ServiceResponse.initServiceReponseSuccess();
        return new ResponseEntity<>(response,HttpStatus.OK);
    }
}

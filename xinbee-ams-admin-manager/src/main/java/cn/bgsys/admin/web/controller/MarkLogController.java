package cn.bgsys.admin.web.controller;

import cn.tendata.bgsys.service.MarkLogService;
import cn.tendata.bgsys.xinbee.model.MarkDetailsDto;
import cn.tendata.bgsys.xinbee.model.MarkLogDto;
import cn.tendata.bgsys.xinbee.model.PageData;
import org.joda.time.DateTime;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

/**
 * Created by SayId on 2017/4/17.
 */
@Controller
@RequestMapping("/marklog")
public class MarkLogController {
    private MarkLogService markLogService;

    @Autowired
    public MarkLogController(MarkLogService markLogService) {
        this.markLogService = markLogService;
    }

    @RequestMapping(value = "", method = RequestMethod.GET)
    public ResponseEntity<PageData<MarkLogDto>> getMarkLog(@RequestParam(value = "page", defaultValue = "0") int page,
                                                           @RequestParam(value = "startDate", required = false)DateTime startDate,
                                                           @RequestParam(value = "endDate", required = false)DateTime endDate,
                                                           @RequestParam(value = "title", required = false)String  title,
                                                           @RequestParam(value = "taskId", required = false)String  taskId,
                                                           @RequestParam(value = "status", required = false)Boolean  status){
        PageData<MarkLogDto> result = markLogService.getMarkLog(startDate,endDate,page-1,title,taskId,status);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @RequestMapping(value = "/{id}/details", method = RequestMethod.GET)
    public ResponseEntity<List<MarkDetailsDto>> getMarkLog( @PathVariable("id") String id){
        List<MarkDetailsDto> result = markLogService.getMarkDetails(id);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

}

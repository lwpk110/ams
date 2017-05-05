package cn.bgsys.admin.web.controller;

import cn.tendata.bgsys.service.BenchMarksService;
import cn.tendata.bgsys.xinbee.model.BenchMarksDto;
import cn.tendata.bgsys.xinbee.model.PageData;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

/**
 * Created by SayId on 2017/4/12.
 */
@Controller
@RequestMapping("/benchmarks")
public class BenchMarksController {
    private BenchMarksService benchMarksService;

    @Autowired
    public BenchMarksController(BenchMarksService benchMarksService) {
        this.benchMarksService = benchMarksService;
    }

    @RequestMapping(value = "", method = RequestMethod.GET)
    public ResponseEntity<PageData<BenchMarksDto>> getBenchMarks(@RequestParam(value = "page", defaultValue = "0") int page,
                                                                 @RequestParam(value = "key", required = false) String key,
                                                                 @RequestParam(value = "sortType", required = false) String sortType) {
        PageData<BenchMarksDto> result = benchMarksService.getBenchMarks(key, page, sortType);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @RequestMapping(value = "/edit/{id}", method = RequestMethod.POST)
    public ResponseEntity<Map<String, String>> update(@PathVariable("id") String id, @RequestBody BenchMarksDto marksDto) {
        benchMarksService.edit(marksDto, id);
        Map<String, String> result = new HashMap<>();
        result.put("success", "true");
        return new ResponseEntity<>(result,HttpStatus.OK);
    }

    @RequestMapping(value = "/delete/{id}", method = RequestMethod.POST)
    public ResponseEntity<Map<String, String>> delete(@PathVariable("id") String id) {
        benchMarksService.delete(id);
        Map<String, String> result = new HashMap<>();
        result.put("success", "true");
        return new ResponseEntity<>(result,HttpStatus.OK);
    }

    @RequestMapping(value = "/add", method = RequestMethod.POST)
    public ResponseEntity<Map<String, String>> add(@RequestBody BenchMarksDto dto) {
        benchMarksService.add(dto);
        Map<String, String> result = new HashMap<>();
        result.put("success", "true");
        return new ResponseEntity<>(result,HttpStatus.OK);
    }

}

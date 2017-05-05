package cn.tendata.bgsys.service;

import cn.tendata.bgsys.xinbee.model.BenchMarksDto;
import cn.tendata.bgsys.xinbee.model.PageData;

/**
 * Created by SayId on 2017/4/12.
 */
public interface BenchMarksService {

    PageData<BenchMarksDto> getBenchMarks(String key, int page, String sortType);

    void add(BenchMarksDto benchMarksDto);

    void edit(BenchMarksDto benchMarksDto,String id);

    void delete(String id);
}

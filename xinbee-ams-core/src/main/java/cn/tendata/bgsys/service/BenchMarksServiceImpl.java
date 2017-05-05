package cn.tendata.bgsys.service;

import cn.tendata.bgsys.xinbee.XinbeeApiAccessManager;
import cn.tendata.bgsys.xinbee.model.BenchMarksDto;
import cn.tendata.bgsys.xinbee.model.PageData;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Created by SayId on 2017/4/12.
 */
@Service
public class BenchMarksServiceImpl implements BenchMarksService {
    private final XinbeeApiAccessManager apiAccessManager;

    @Autowired
    public BenchMarksServiceImpl(XinbeeApiAccessManager apiAccessManager) {
        this.apiAccessManager = apiAccessManager;
    }

    @Override
    public PageData<BenchMarksDto> getBenchMarks(String key, int page, String sortType) {
        return apiAccessManager.getBenchMarks(key, page, sortType);
    }

    @Override
    public void add(BenchMarksDto benchMarksDto) {
        apiAccessManager.addBenchMarks(benchMarksDto);
    }

    @Override
    public void edit(BenchMarksDto benchMarksDto, String id) {
        apiAccessManager.editBenchMarks(benchMarksDto, id);
    }

    @Override
    public void delete(String id) {
        apiAccessManager.deleteBenchMarks(id);
    }
}

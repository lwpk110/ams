package cn.tendata.bgsys.xinbee.model;

import java.util.List;

/**
 * Created by minjay on 2017/2/8.
 */
public class PageData<T> {

    private long totalElements;

    private List<T> data;

    public long getTotalElements() {
        return totalElements;
    }

    public void setTotalElements(long totalElements) {
        this.totalElements = totalElements;
    }

    public List<T> getData() {
        return data;
    }

    public void setData(List<T> data) {
        this.data = data;
    }
}

package nsu.lerabbb.app.controllers;

import lombok.AllArgsConstructor;
import nsu.lerabbb.app.Logger;
import nsu.lerabbb.app.entities.SaleContent;
import nsu.lerabbb.app.entities.Stock;
import nsu.lerabbb.app.repo.StockRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.net.URI;
import java.net.URISyntaxException;
import java.sql.Date;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@AllArgsConstructor
@RestController
@RequestMapping("/stock")
@CrossOrigin("http://localhost:3000")
public class StockController {
    @Autowired
    private StockRepository repo;

    @GetMapping
    public List<Stock> readAll(){
        return repo.findAll();
    }

    @GetMapping("/{id}")
    public Stock read(@PathVariable Long id){
        Optional<Stock> optional = repo.findById(id);
        if (optional.isEmpty()) {
            throw new RuntimeException();
        }
        return optional.get();
    }

    @PostMapping
    public ResponseEntity create(@RequestBody Stock stock) throws URISyntaxException {
        Stock savedDetail = repo.save(stock);
        return ResponseEntity.created(new URI("/stock/" + savedDetail.getId())).body(savedDetail);
    }

    @PutMapping("/{id}")
    public ResponseEntity update(@PathVariable Long id, @RequestBody Stock stock){
        Optional<Stock> optional = repo.findById(id);
        if (optional.isEmpty()) {
            throw new RuntimeException();
        }
        Stock curStock = optional.get();
        curStock.setCell(stock.getCell());
        curStock.setCount(stock.getCount());
        curStock.setDetail(stock.getDetail());
        curStock.setOrder(stock.getOrder());
        curStock = repo.save(curStock);
        return ResponseEntity.ok(curStock);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity delete(@PathVariable Long id){
        repo.deleteById(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/not-sold/start={startDate}/end={endDate}")
    public List<Stock> readNotSold(@PathVariable String startDate, @PathVariable String endDate) {
        Logger.getInstance().info("start "+startDate);
        Logger.getInstance().info("end "+endDate);
        Optional<List<Object[]>> optional = repo.findNotSold(Date.valueOf(startDate), Date.valueOf(endDate));
        if (optional.isEmpty()) {
            throw new RuntimeException();
        }
        List<Stock> result = new ArrayList<>();
        for (Object[] obj : optional.get()) {
            Stock temp = new Stock();
            temp.getDetail().setId(((BigDecimal) obj[0]).longValue());
            temp.getCell().setId(((BigDecimal) obj[1]).longValue());
            temp.getDetail().setName((String) obj[2]);
            temp.setCount(((BigDecimal) obj[3]).intValue());
            result.add(temp);
        }
        return result;
    }

    @GetMapping("/not-sold-count/start={startDate}/end={endDate}")
    public Stock countNotSold(@PathVariable String startDate, @PathVariable String endDate) {
        Logger.getInstance().info("start "+startDate);
        Logger.getInstance().info("end "+endDate);
        Optional<Object[]> optional = repo.countNotSold(Date.valueOf(startDate), Date.valueOf(endDate));
        if (optional.isEmpty()) {
            throw new RuntimeException();
        }
        Stock stock = new Stock();
        stock.setSum((Integer) optional.get()[0]);
        stock.setPercentage((Float) optional.get()[1]);
        return stock;
    }

    @GetMapping("/stock-report")
    public List<Stock> readStockReport() {
        Optional<List<Object[]>> optional = repo.findStockReport();
        if (optional.isEmpty()) {
            throw new RuntimeException();
        }
        List<Stock> result = new ArrayList<>();
        for (Object[] obj : optional.get()) {
            Stock temp = new Stock();
            temp.getDetail().setId(((BigDecimal) obj[0]).longValue());
            temp.getDetail().setName((String) obj[1]);
            temp.getOrder().setId(((BigDecimal) obj[2]).longValue());
            temp.setCount(((BigDecimal) obj[3]).intValue());
            temp.setPurchasePrice((Double) obj[4]);
            result.add(temp);
        }
        return result;
    }

    @GetMapping("/empty-cells")
    public Integer readEmptyCells() {
        Optional<Object[]> optional = repo.findEmptyCells();
        if (optional.isEmpty()) {
            throw new RuntimeException();
        }
        return (Integer) optional.get()[0];
    }

    @GetMapping("/capacity")
    public Integer readCapacity() {
        Optional<Object[]> optional = repo.findCapacity();
        if (optional.isEmpty()) {
            throw new RuntimeException();
        }
        return (Integer) optional.get()[0];
    }
}

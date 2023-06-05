package nsu.lerabbb.app.controllers;

import lombok.AllArgsConstructor;
import nsu.lerabbb.app.entities.Request;
import nsu.lerabbb.app.entities.SaleContent;
import nsu.lerabbb.app.repo.SaleContentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

//TODO сделать 6 запрос!!!!

@AllArgsConstructor
@RestController
@RequestMapping("/sale_content")
@CrossOrigin("http://localhost:3000")
public class SaleContentController {
    @Autowired
    private SaleContentRepository repo;

    @GetMapping
    public List<SaleContent> readAll(){
        return repo.findAll();
    }

    @GetMapping("/sale={saleId}/sd={stockId}")
    public SaleContent read(@PathVariable Long saleId, @PathVariable Long stockDetailId){
        Optional<SaleContent> optional = repo.findById(saleId, stockDetailId);
        if (optional.isEmpty()) {
            throw new RuntimeException();
        }
        return optional.get();
    }

    @GetMapping("/sale={saleId}")
    public List<SaleContent> readBySale(@PathVariable Long saleId){
        Optional<List<SaleContent>> optional = repo.findBySale(saleId);
        if (optional.isEmpty()) {
            throw new RuntimeException();
        }
        return optional.get();
    }

    @PostMapping
    public ResponseEntity create(@RequestBody SaleContent saleContent) throws URISyntaxException {
        SaleContent save = repo.save(saleContent);
        Long saleId =  save.getSale().getId();
        Long stockDetailId = save.getStockDetail().getId();
        return ResponseEntity.created(new URI("/sale_content/sale=" + saleId + "/sd=" + stockDetailId)).body(save);
    }

    @PutMapping("/sale={saleId}/sd={stockId}")
    public ResponseEntity update(@PathVariable Long saleId, @PathVariable Long stockDetailId, @RequestBody SaleContent saleContent){
        Optional<SaleContent> optional = repo.findById(saleId, stockDetailId);
        if (optional.isEmpty()) {
            throw new RuntimeException();
        }
        SaleContent curSC = optional.get();
        curSC.setCount(saleContent.getCount());
        curSC.setPrice(saleContent.getPrice());
        curSC.setSale(saleContent.getSale());
        curSC.setStockDetail(saleContent.getStockDetail());
        curSC = repo.save(curSC);
        return ResponseEntity.ok(curSC);
    }

    @DeleteMapping("/sale={saleId}/sd={stockId}")
    public ResponseEntity delete(@PathVariable Long saleId, @PathVariable Long stockDetailId){
        repo.deleteById(saleId, stockDetailId);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/cash-report/start={startDate}/end={endDate}")
    public List<SaleContent> readCashReport(@PathVariable String startDate, @PathVariable String endDate) {
        Optional<List<Object[]>> optional = repo.findCashReport(java.sql.Date.valueOf(startDate), java.sql.Date.valueOf(endDate));
        if (optional.isEmpty()) {
            throw new RuntimeException();
        }
        List<SaleContent> result = new ArrayList<>();
        for (Object[] obj : optional.get()) {
            SaleContent temp = new SaleContent();
            temp.getSale().setId(((BigDecimal) obj[0]).longValue());
            temp.getStockDetail().getDetail().setId(((BigDecimal) obj[1]).longValue());
            temp.getStockDetail().getDetail().setName((String) obj[2]);
            temp.setCount(((BigDecimal) obj[3]).intValue());
            temp.setPrice(((Double) obj[4]).floatValue());
            temp.setTotalSum(((Integer) obj[5]).floatValue());
            temp.getSale().setDate((Date) obj[6]);
            temp.getSale().getConsumer().setId(((BigDecimal) obj[7]).longValue());
            temp.getSale().getConsumer().setLastname((String) obj[8]);
            temp.getSale().getConsumer().setFirstname((String) obj[9]);
            temp.getSale().getConsumer().setPatronymic((String) obj[10]);
            result.add(temp);
        }
        return result;
    }

}

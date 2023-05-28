package nsu.lerabbb.app.controllers;

import lombok.AllArgsConstructor;
import nsu.lerabbb.app.entities.SaleContent;
import nsu.lerabbb.app.repo.SaleContentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

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
}

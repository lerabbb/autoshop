package nsu.lerabbb.app.controllers;

import lombok.AllArgsConstructor;
import nsu.lerabbb.app.entities.Defect;
import nsu.lerabbb.app.repo.DefectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@RestController
@RequestMapping("/defects")
@CrossOrigin("http://localhost:3000")
public class DefectController {
    @Autowired
    private DefectRepository repo;

    @GetMapping
    public List<Defect> readAll(){
        return repo.findAll();
    }

    @GetMapping("/sale={saleId}/sd={stockDetailId}")
    public Defect read(@PathVariable Long saleId, @PathVariable Long stockDetailId){
        Optional<Defect> optional = repo.findById(saleId, stockDetailId);
        if(optional.isEmpty()){
            throw new RuntimeException();
        }
        return optional.get();
    }

    @PostMapping
    public ResponseEntity create(@RequestBody Defect defect) throws URISyntaxException {
        Defect save = repo.save(defect);
        Long saleId = save.getSale().getId();
        Long stockDetailId = save.getStockDetail().getId();
        return ResponseEntity.created(new URI("/defects/sale=" + saleId + "/sd="+stockDetailId)).body(save);
    }

    @PutMapping("/sale={saleId}/sd={stockDetailId}")
    public ResponseEntity update(@PathVariable Long saleId, @PathVariable Long stockDetailId, @RequestBody Defect defect){
        Optional<Defect> optional = repo.findById(saleId, stockDetailId);
        if(optional.isEmpty()){
            throw new RuntimeException();
        }
        Defect curDefect = optional.get();
        curDefect.setCount(defect.getCount());
        curDefect.setRefundFromVendor(defect.getRefundFromVendor());
        curDefect.setRefundToConsumer(defect.getRefundToConsumer());
        curDefect.setSale(defect.getSale());
        curDefect.setStockDetail(defect.getStockDetail());
        curDefect = repo.save(curDefect);
        return ResponseEntity.ok(curDefect);
    }

    @DeleteMapping("/sale={saleId}/sd={stockDetailId}")
    public ResponseEntity delete(@PathVariable Long saleId, @PathVariable Long stockDetailId){
        repo.deleteById(saleId, stockDetailId);
        return ResponseEntity.ok().build();
    }

}

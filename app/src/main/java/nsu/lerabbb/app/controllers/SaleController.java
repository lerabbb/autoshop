package nsu.lerabbb.app.controllers;

import com.fasterxml.jackson.databind.DatabindException;
import lombok.AllArgsConstructor;
import nsu.lerabbb.app.Logger;
import nsu.lerabbb.app.entities.Sale;
import nsu.lerabbb.app.repo.SaleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@RestController
@RequestMapping("/sales")
@CrossOrigin("http://localhost:3000")
public class SaleController {
    @Autowired
    private SaleRepository repo;

    @GetMapping
    public List<Sale> readAll(){
        return repo.findAll();
    }

    @GetMapping("/{id}")
    public Sale read(@PathVariable Long id){
        Optional<Sale> optional = repo.findById(id);
        if (optional.isEmpty()) {
            throw new RuntimeException();
        }
        return optional.get();
    }

    @PostMapping
    public ResponseEntity create(@RequestBody Sale sale) throws URISyntaxException {
        Sale save = repo.save(sale);
        return ResponseEntity.created(new URI("/sales/" + save.getId())).body(save);
    }

    @PutMapping("/{id}")
    public ResponseEntity update(@PathVariable Long id, @RequestBody Sale sale){
        Optional<Sale> optional = repo.findById(id);
        if (optional.isEmpty()) {
            throw new RuntimeException();
        }
        Sale curSale = optional.get();
        curSale.setDate(sale.getDate());
        curSale.setConsumer(sale.getConsumer());
        curSale = repo.save(curSale);
        return ResponseEntity.ok(curSale);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity delete(@PathVariable Long id){
        repo.deleteById(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/profit/start={startDate}/endDate={endDate}")
    public Integer readProfit(@PathVariable String startDate, @PathVariable String endDate) {
        Logger.getInstance().info("start "+startDate);
        Logger.getInstance().info("end "+endDate);
        Optional<Object[]> optional = repo.findProfit(java.sql.Date.valueOf(startDate), java.sql.Date.valueOf(endDate));
        if (optional.isEmpty()) {
            throw new RuntimeException();
        }
        return (Integer) optional.get()[0];
    }

}

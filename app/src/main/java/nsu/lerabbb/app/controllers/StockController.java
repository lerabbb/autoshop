package nsu.lerabbb.app.controllers;

import lombok.AllArgsConstructor;
import nsu.lerabbb.app.entities.Stock;
import nsu.lerabbb.app.repo.StockRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
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
}

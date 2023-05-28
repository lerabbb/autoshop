package nsu.lerabbb.app.controllers;

import lombok.AllArgsConstructor;
import nsu.lerabbb.app.entities.StockRequest;
import nsu.lerabbb.app.repo.StockRequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@RestController
@RequestMapping("/stock_request")
@CrossOrigin("http://localhost:3000")
public class StockRequestController {
    @Autowired
    private StockRequestRepository repo;

    @GetMapping
    public List<StockRequest> readAll(){
        return repo.findAll();
    }

    @GetMapping("/sd={stockDetailId}/b={bookId}")
    public StockRequest read(@PathVariable Long stockDetailId, @PathVariable Long bookId){
        Optional<StockRequest> optional = repo.findById(stockDetailId, bookId);
        if (optional.isEmpty()) {
            throw new RuntimeException();
        }
        return optional.get();
    }

    @PostMapping
    public ResponseEntity create(@RequestBody StockRequest stock) throws URISyntaxException {
        StockRequest save = repo.save(stock);
        Long bookId = save.getBook().getId();
        Long stockDetailId = save.getStockDetail().getId();
        return ResponseEntity.created(new URI("/stock_request/sd=" + stockDetailId + "/b=" + bookId)).body(save);
    }

    @PutMapping("/sd={stockDetailId}/b={bookId}")
    public ResponseEntity update(@PathVariable Long stockDetailId, @PathVariable Long bookId, @RequestBody StockRequest stock){
        Optional<StockRequest> optional = repo.findById(stockDetailId, bookId);
        if (optional.isEmpty()) {
            throw new RuntimeException();
        }
        StockRequest curStock = optional.get();
        curStock.setStockDetail(stock.getStockDetail());
        curStock.setBook(stock.getBook());
        curStock = repo.save(curStock);
        return ResponseEntity.ok(curStock);
    }

    @DeleteMapping("/sd={stockDetailId}/b={bookId}")
    public ResponseEntity delete(@PathVariable Long stockDetailId, @PathVariable Long bookId){
        repo.deleteById(stockDetailId, bookId);
        return ResponseEntity.ok().build();
    }

}

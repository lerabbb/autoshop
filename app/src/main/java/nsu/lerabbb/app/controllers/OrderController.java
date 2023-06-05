package nsu.lerabbb.app.controllers;

import lombok.AllArgsConstructor;
import nsu.lerabbb.app.entities.Order;
import nsu.lerabbb.app.repo.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@RestController
@RequestMapping("/orders")
@CrossOrigin("http://localhost:3000")
public class OrderController {
    @Autowired
    private OrderRepository repo;

    @GetMapping
    public List<Order> readAll(){
        return repo.findAll();
    }

    @GetMapping("/{id}")
    public Order read(@PathVariable Long id){
        Optional<Order> optional = repo.findById(id);
        if(optional.isEmpty()){
            throw new RuntimeException();
        }
        return optional.get();
    }

    @PostMapping
    public ResponseEntity create(@RequestBody Order order) throws URISyntaxException {
        Order savedDetail = repo.save(order);
        return ResponseEntity.created(new URI("/orders/" + savedDetail.getId())).body(savedDetail);
    }

    @PutMapping("/{id}")
    public ResponseEntity update(@PathVariable Long id, @RequestBody Order order){
        Optional<Order> optional = repo.findById(id);
        if(optional.isEmpty()){
            throw new RuntimeException();
        }
        Order curOrder = optional.get();
        curOrder.setIsDone(order.getIsDone());
        curOrder.setVendor(order.getVendor());
        curOrder = repo.save(curOrder);
        return ResponseEntity.ok(curOrder);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity delete(@PathVariable Long id){
        repo.deleteById(id);
        return ResponseEntity.ok().build();
    }
}

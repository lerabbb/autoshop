package nsu.lerabbb.app.controllers;

import lombok.AllArgsConstructor;
import nsu.lerabbb.app.Logger;
import nsu.lerabbb.app.entities.*;
import nsu.lerabbb.app.repo.OrderContentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;


@AllArgsConstructor
@RestController
@RequestMapping("/order_content")
@CrossOrigin("http://localhost:3000")
public class OrderContentController {
    @Autowired
    private OrderContentRepository repo;

    @GetMapping
    public List<OrderContent> readAll(){
        return repo.findAll();
    }

    @GetMapping("/o={orderId}/d={detailId}")
    public OrderContent read(@PathVariable Long orderId, @PathVariable Long detailId){
        Optional<OrderContent> optional = repo.findById(orderId, detailId);
        if(optional.isEmpty()){
            throw new RuntimeException();
        }
        return optional.get();
    }

    @GetMapping("/o={orderId}")
    public List<OrderContent> readByOrder(@PathVariable Long orderId){
        Optional<List<OrderContent>> optional = repo.findByOrder(orderId);
        if(optional.isEmpty()){
            throw new RuntimeException();
        }
        return optional.get();
    }

    @PostMapping
    public ResponseEntity create(@RequestBody OrderContent orderContent) throws URISyntaxException {
        OrderContent save = repo.save(orderContent);
        Long orderId =  save.getOrder().getId();
        Long detailId = save.getDetail().getId();
        return ResponseEntity.created(new URI("/order_content/o=" + orderId + "/d=" + detailId)).body(save);
    }

    @PutMapping("/o={orderId}/d={detailId}")
    public ResponseEntity update(@PathVariable Long orderId, @PathVariable Long detailId, @RequestBody OrderContent orderContent){
        Optional<OrderContent> optional = repo.findById(orderId, detailId);
        if(optional.isEmpty()){
            throw new RuntimeException();
        }
        OrderContent curOC = optional.get();
        curOC.setCount(orderContent.getCount());
        curOC.setPrice(orderContent.getPrice());
        curOC.setOrder(orderContent.getOrder());
        curOC.setDetail(orderContent.getDetail());
        curOC.setDateRcvd(orderContent.getDateRcvd());
        curOC.setDateSent(orderContent.getDateSent());
        curOC = repo.save(curOC);
        return ResponseEntity.ok(curOC);
    }

    @DeleteMapping("/o={orderId}/d={detailId}")
    public ResponseEntity delete(@PathVariable Long orderId, @PathVariable Long detailId){
        repo.deleteById(orderId, detailId);
        return ResponseEntity.ok().build();
    }

}

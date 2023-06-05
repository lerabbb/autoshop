package nsu.lerabbb.app.controllers;

import nsu.lerabbb.app.Logger;
import nsu.lerabbb.app.entities.Consumer;
import nsu.lerabbb.app.exceptions.ConsumerNotFoundException;
import nsu.lerabbb.app.repo.ConsumerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.sql.Date;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/consumers")
@CrossOrigin("http://localhost:3000")
public class ConsumersController {
    @Autowired
    private ConsumerRepository repo;

    @GetMapping
    public List<Consumer> readAll(){
        return repo.findAll();
    }

    @GetMapping("/{id}")
    public Consumer read(@PathVariable Long id){
        Optional<Consumer> optional = repo.findById(id);
        if(optional.isEmpty()){
            throw new ConsumerNotFoundException(id);
        }
        return optional.get();
    }

    @PostMapping
    public ResponseEntity create(@RequestBody Consumer consumer) throws URISyntaxException {
        Consumer savedConsumer = repo.save(consumer);
        return ResponseEntity.created(new URI("/consumers/" + savedConsumer.getId())).body(savedConsumer);
    }

    @PutMapping("/{id}")
    public ResponseEntity update(@PathVariable Long id, @RequestBody Consumer consumer){
        Optional<Consumer> optional = repo.findById(id);
        if(optional.isEmpty()){
            throw new ConsumerNotFoundException(id);
        }
        Consumer curConsumer = optional.get();
        curConsumer.setFirstname(consumer.getFirstname());
        curConsumer.setLastname(consumer.getLastname());
        curConsumer.setPatronymic(consumer.getPatronymic());
        curConsumer.setPhoneNum(consumer.getPhoneNum());
        curConsumer = repo.save(curConsumer);
        return ResponseEntity.ok(curConsumer);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity delete(@PathVariable Long id){
        if(!repo.existsById(id)){
            throw new ConsumerNotFoundException(id);
        }
        repo.deleteById(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/detail={detail}/start={startDate}/end={endDate}")
    public List<Consumer> readByDetailAndDate(@PathVariable Long detail, @PathVariable String startDate, @PathVariable String endDate){
        Logger.getInstance().info("start "+startDate);
        Logger.getInstance().info("end "+endDate);
        Optional<List<Consumer>> optional = repo.findByDetailAndDate(detail, Date.valueOf(startDate), Date.valueOf(endDate));
        if(optional.isEmpty()){
            throw new RuntimeException();
        }
        return optional.get();
    }

    @GetMapping("/detail={detail}/count={count}")
    public List<Consumer> readByDetailCount(@PathVariable Long detail, @PathVariable Integer count){
        Optional<List<Consumer>> optional = repo.findByDetailCount(detail, count);
        if(optional.isEmpty()){
            throw new RuntimeException();
        }
        return optional.get();
    }
}

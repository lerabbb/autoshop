package nsu.lerabbb.app.controllers;

import lombok.AllArgsConstructor;
import nsu.lerabbb.app.entities.Producer;
import nsu.lerabbb.app.repo.ProducerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@RestController
@RequestMapping("/producers")
@CrossOrigin("http://localhost:3000")
public class ProducerController {
    @Autowired
    private ProducerRepository repo;

    @GetMapping
    public List<Producer> readAll(){
        return repo.findAll();
    }

    @GetMapping("/{id}")
    public Producer read(@PathVariable Long id){
        Optional<Producer> optional = repo.findById(id);
        if(optional.isEmpty()){
            throw new RuntimeException();
        }
        return optional.get();
    }

    @PostMapping
    public ResponseEntity create(@RequestBody Producer producer) throws URISyntaxException {
        Producer savedProducer = repo.save(producer);
        return ResponseEntity.created(new URI("/producers/" + savedProducer.getId())).body(savedProducer);
    }

    @PutMapping("/{id}")
    public ResponseEntity update(@PathVariable Long id, @RequestBody Producer producer){
        Optional<Producer> optional = repo.findById(id);
        if(optional.isEmpty()){
            throw new RuntimeException();
        }
        Producer curProducer = optional.get();
        curProducer.setAddress(producer.getAddress());
        curProducer.setName(producer.getName());
        curProducer.setPhoneNum(producer.getPhoneNum());
        curProducer = repo.save(curProducer);
        return ResponseEntity.ok(curProducer);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity delete(@PathVariable Long id){
        repo.deleteById(id);
        return ResponseEntity.ok().build();
    }
}

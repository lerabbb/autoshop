package nsu.lerabbb.app.controllers;

import nsu.lerabbb.app.entities.Detail;
import nsu.lerabbb.app.repo.DetailRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping("/details")
@CrossOrigin("http://localhost:3000")
public class DetailController {
    private DetailRepository repo;

    @Autowired
    public DetailController(DetailRepository repo){
        this.repo = repo;
    }

    @GetMapping
    public List<Detail> readAll(){
        return repo.findAll();
    }

    @GetMapping("/{id}")
    public Detail read(@PathVariable Long id){
        Optional<Detail> optional = repo.findById(id);
        if(optional.isEmpty()){
            throw new RuntimeException();
        }
        return optional.get();
    }

    @PostMapping
    public ResponseEntity create(@RequestBody Detail detail) throws URISyntaxException {
        Detail savedDetail = repo.save(detail);
        return ResponseEntity.created(new URI("/details/" + savedDetail.getId())).body(savedDetail);
    }

    @PutMapping("/{id}")
    public ResponseEntity update(@PathVariable Long id, @RequestBody Detail detail){
        Optional<Detail> optional = repo.findById(id);
        if(optional.isEmpty()){
            throw new RuntimeException();
        }
        Detail curDetail = optional.get();
        curDetail.setName(detail.getName());
        curDetail.setGuarantee(detail.getGuarantee());
        curDetail.setProducer(detail.getProducer());
        curDetail.setStockDetails(detail.getStockDetails());
        curDetail.setSize(detail.getSize());
        curDetail = repo.save(curDetail);
        return ResponseEntity.ok(curDetail);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity delete(@PathVariable Long id){
        repo.deleteById(id);
        return ResponseEntity.ok().build();
    }

}

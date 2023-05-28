package nsu.lerabbb.app.controllers;

import lombok.AllArgsConstructor;
import nsu.lerabbb.app.entities.Request;
import nsu.lerabbb.app.repo.RequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@RestController
@RequestMapping("/requests")
@CrossOrigin("http://localhost:3000")
public class RequestController {
    @Autowired
    private RequestRepository repo;

    @GetMapping
    public List<Request> readAll(){
        return repo.findAll();
    }

    @GetMapping("/{id}")
    public Request read(@PathVariable Long id) {
        Optional<Request> optional = repo.findById(id);
        if (optional.isEmpty()) {
            throw new RuntimeException();
        }
        return optional.get();
    }
    @PostMapping
    public ResponseEntity create(@RequestBody Request request) throws URISyntaxException {
        Request save = repo.save(request);
        return ResponseEntity.created(new URI("/requests/" + save.getId())).body(save);
    }

    @PutMapping("/{id}")
    public ResponseEntity update(@PathVariable Long id, @RequestBody Request request){
        Optional<Request> optional = repo.findById(id);
        if (optional.isEmpty()) {
            throw new RuntimeException();
        }
        Request curRequest = optional.get();
        curRequest.setConsumer(request.getConsumer());
        curRequest.setRegisterDate(request.getRegisterDate());
        curRequest = repo.save(curRequest);
        return ResponseEntity.ok(curRequest);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity delete(@PathVariable Long id){
        repo.deleteById(id);
        return ResponseEntity.ok().build();
    }

}

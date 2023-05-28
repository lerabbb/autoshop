package nsu.lerabbb.app.controllers;

import lombok.AllArgsConstructor;
import nsu.lerabbb.app.entities.RequestHistory;
import nsu.lerabbb.app.repo.RequestHistoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@RestController
@RequestMapping("/request_history")
@CrossOrigin("http://localhost:3000")
public class RequestHistoryController {
    @Autowired
    private RequestHistoryRepository repo;

    @GetMapping
    public List<RequestHistory> readAll(){
        return repo.findAll();
    }

    @GetMapping("/{id}")
    public RequestHistory read(@PathVariable Long id){
        Optional<RequestHistory> optional = repo.findById(id);
        if (optional.isEmpty()) {
            throw new RuntimeException();
        }
        return optional.get();
    }

    @PostMapping
    public ResponseEntity create(@RequestBody RequestHistory requestHistory) throws URISyntaxException {
        RequestHistory savedDetail = repo.save(requestHistory);
        return ResponseEntity.created(new URI("/request_history/" + savedDetail.getId())).body(savedDetail);
    }

    @PutMapping("/{id}")
    public ResponseEntity update(@PathVariable Long id, @RequestBody RequestHistory requestHistory){
        Optional<RequestHistory> optional = repo.findById(id);
        if (optional.isEmpty()) {
            throw new RuntimeException();
        }
        RequestHistory curRH = optional.get();
        curRH.setBook(requestHistory.getBook());
        curRH.setIsBought(requestHistory.getIsBought());
        curRH.setSaleContent(requestHistory.getSaleContent());
        curRH = repo.save(curRH);
        return ResponseEntity.ok(curRH);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity delete(@PathVariable Long id){
        repo.deleteById(id);
        return ResponseEntity.ok().build();
    }
}

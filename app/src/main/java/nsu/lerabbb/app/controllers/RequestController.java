package nsu.lerabbb.app.controllers;

import lombok.AllArgsConstructor;
import nsu.lerabbb.app.entities.Detail;
import nsu.lerabbb.app.entities.Request;
import nsu.lerabbb.app.repo.RequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.Date;
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

    @GetMapping("/detail={detail}")
    public List<Request> readByDetail(@PathVariable Long detail) {
        Optional<List<Object[]>> optional = repo.findByDetail(detail);
        if (optional.isEmpty()) {
            throw new RuntimeException();
        }
        List<Request> result = new ArrayList<>();
        for (Object[] obj : optional.get()) {
            Request request = new Request();
            request.setId(((BigDecimal) obj[0]).longValue());
            request.getConsumer().setId(((BigDecimal) obj[1]).longValue());
            request.getConsumer().setLastname((String) obj[2]);
            request.getConsumer().setFirstname((String) obj[3]);
            request.getConsumer().setPatronymic((String) obj[4]);
            request.getConsumer().setPhoneNum((String) obj[5]);
            request.setRegisterDate((Date) obj[6]);
            request.setCount(((Double) obj[7]));
            result.add(request);
        }
        return result;
    }

    @GetMapping("/sum-price/detail={detail}")
    public Integer readSumPrice(@PathVariable Long detail) {
        Optional<Object[]> optional = repo.findSum(detail);
        if (optional.isEmpty()) {
            throw new RuntimeException();
        }
        return (Integer) optional.get()[0];
    }

}

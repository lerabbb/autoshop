package nsu.lerabbb.app.controllers;

import lombok.AllArgsConstructor;
import nsu.lerabbb.app.entities.OrderContent;
import nsu.lerabbb.app.entities.RequestContent;
import nsu.lerabbb.app.repo.RequestContentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@RestController
@RequestMapping("/request_content")
@CrossOrigin("http://localhost:3000")
public class RequestContentController {
    @Autowired
    private RequestContentRepository repo;

    @GetMapping
    public List<RequestContent> readAll(){
        return repo.findAll();
    }

    @GetMapping("/{id}")
    public RequestContent read(@PathVariable Long id){
        Optional<RequestContent> optional = repo.findById(id);
        if(optional.isEmpty()){
            throw new RuntimeException();
        }
        return optional.get();
    }

    @GetMapping("/r={requestId}")
    public List<RequestContent> readByOrder(@PathVariable Long requestId){
        Optional<List<RequestContent>> optional = repo.findByRequest(requestId);
        if(optional.isEmpty()){
            throw new RuntimeException();
        }
        return optional.get();
    }

    @PostMapping
    public ResponseEntity create(@RequestBody RequestContent requestContent) throws URISyntaxException {
        RequestContent save = repo.save(requestContent);
        return ResponseEntity.created(new URI("/request_content/" + save.getId())).body(save);
    }

    @PutMapping("/{id}")
    public ResponseEntity update(@PathVariable Long id, @RequestBody RequestContent requestContent){
        Optional<RequestContent> optional = repo.findById(id);
        if(optional.isEmpty()){
            throw new RuntimeException();
        }
        RequestContent curRequestContent = optional.get();
        curRequestContent.setRequest(requestContent.getRequest());
        curRequestContent.setCount(requestContent.getCount());
        curRequestContent.setDetail(requestContent.getDetail());
        curRequestContent.setNotifyDate(requestContent.getNotifyDate());
        curRequestContent.setState(requestContent.getState());
        curRequestContent = repo.save(curRequestContent);
        return ResponseEntity.ok(curRequestContent);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity delete(@PathVariable Long id){
        repo.deleteById(id);
        return ResponseEntity.ok().build();
    }
}

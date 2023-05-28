package nsu.lerabbb.app.controllers;

import nsu.lerabbb.app.entities.Cell;
import nsu.lerabbb.app.repo.CellRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/cells")
@CrossOrigin("http://localhost:3000")
public class CellController {
    private CellRepository repo;

    @Autowired
    public CellController(CellRepository repo){
        this.repo = repo;
    }

    @GetMapping
    public List<Cell> readAll(){
        return repo.findAll();
    }

    @GetMapping("/{id}")
    public Cell read(@PathVariable Long id){
        Optional<Cell> optional = repo.findById(id);
        if(optional.isEmpty()){
            throw new RuntimeException();
        }
        return optional.get();
    }

    @PostMapping
    public ResponseEntity create(@RequestBody Cell cell) throws URISyntaxException {
        Cell savedCell = repo.save(cell);
        return ResponseEntity.created(new URI("/cells/" + savedCell.getId())).body(savedCell);
    }

    @PutMapping("/{id}")
    public ResponseEntity update(@PathVariable Long id, @RequestBody Cell cell){
        Optional<Cell> optional = repo.findById(id);
        if(optional.isEmpty()){
            throw new RuntimeException();
        }
        Cell curCell = optional.get();
        curCell.setSize(cell.getSize());
        curCell = repo.save(curCell);
        return ResponseEntity.ok(curCell);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity delete(@PathVariable Long id){
        repo.deleteById(id);
        return ResponseEntity.ok().build();
    }

}

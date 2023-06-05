package nsu.lerabbb.app.controllers;

import nsu.lerabbb.app.Logger;
import nsu.lerabbb.app.entities.Detail;
import nsu.lerabbb.app.repo.DetailRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.net.URI;
import java.net.URISyntaxException;
import java.sql.Date;
import java.util.ArrayList;
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
        curDetail.setSize(detail.getSize());
        curDetail = repo.save(curDetail);
        return ResponseEntity.ok(curDetail);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity delete(@PathVariable Long id){
        repo.deleteById(id);
        return ResponseEntity.ok().build();
    }


    @GetMapping("/info={id}")
    public List<Detail> readInfoById(@PathVariable Long id){
        Optional<List<Object[]>> optional = repo.findInfoById(id);
        if(optional.isEmpty()){
            throw new RuntimeException();
        }
        List<Detail> result = new ArrayList<>();
        Detail detail = new Detail();
        for(Object[] obj: optional.get()){
            detail.setId(((BigDecimal) obj[0]).longValue());
            detail.setName((String) obj[1]);
            detail.setPrice((Double) obj[2]);
            detail.getVendor().setId(((BigDecimal) obj[3]).longValue());
            detail.getVendor().setName((String) obj[4]);
            detail.getVendor().setDeliveryTime(((BigDecimal) obj[5]).intValue());
            result.add(detail);
        }
        return result;
    }

    @GetMapping("/best-sells")
    public List<Detail> readBestSells(){
        Optional<List<Object[]>> optional = repo.findBestSellingDetails();
        if(optional.isEmpty()){
            throw new RuntimeException();
        }
        List<Detail> result = new ArrayList<>();
        for(Object[] obj: optional.get()){
            Detail detail = new Detail();
            detail.setId(((BigDecimal) obj[0]).longValue());
            detail.setName((String) obj[1]);
            detail.setSum((Float) obj[2]);
            result.add(detail);
        }
        return result;
    }

    @GetMapping("/overhead-costs")
        public List<Detail> readOverheadCosts() {
        Optional<List<Object[]>> optional = repo.findOverheadCosts();
        if (optional.isEmpty()) {
            throw new RuntimeException();
        }
        List<Detail> result = new ArrayList<>();
        for (Object[] obj : optional.get()) {
            Detail detail = new Detail();
            detail.setId(((BigDecimal) obj[0]).longValue());
            detail.setName((String) obj[1]);
            detail.setPercents((float) ((BigDecimal) obj[2]).doubleValue());
            result.add(detail);
        }
        return result;
    }

    @GetMapping("/sold/day={day}")
        public List<Detail> readSoldByDay(@PathVariable String day) {
        Logger.getInstance().info("start "+day);
        Optional<List<Object[]>> optional = repo.findSold(Date.valueOf(day));
        if (optional.isEmpty()) {
            throw new RuntimeException();
        }
        List<Detail> result = new ArrayList<>();
        for (Object[] obj : optional.get()) {
            Detail detail = new Detail();
            detail.setId(((BigDecimal) obj[0]).longValue());
            detail.setName((String) obj[1]);
            detail.setPrice((Double) obj[2]);
            detail.setCount(((Integer) obj[3]));
            result.add(detail);
        }
        return result;
    }

    @GetMapping("/velocity-of-money")
        public List<Detail> readVelocityOfMoney() {
        Optional<List<Object[]>> optional = repo.findVelocityOfMoney();
        if (optional.isEmpty()) {
            throw new RuntimeException();
        }
        List<Detail> result = new ArrayList<>();
        Detail detail = new Detail();
        for (Object[] obj : optional.get()) {
            detail.setId(((BigDecimal) obj[0]).longValue());
            detail.setName((String) obj[1]);
            detail.setVelocityOfMoney(((BigDecimal) obj[2]).intValue());
            result.add(detail);
        }
        return result;
    }
}

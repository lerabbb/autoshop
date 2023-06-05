package nsu.lerabbb.app.controllers;

import lombok.AllArgsConstructor;
import nsu.lerabbb.app.Logger;
import nsu.lerabbb.app.entities.Stock;
import nsu.lerabbb.app.entities.Vendor;
import nsu.lerabbb.app.repo.VendorRepository;
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

@AllArgsConstructor
@RestController
@RequestMapping("/vendors")
@CrossOrigin("http://localhost:3000")
public class VendorController {
    @Autowired
    private VendorRepository repo;

    @GetMapping
    public List<Vendor> readAll(){
        return repo.findAll();
    }

    @GetMapping("/{id}")
    public Vendor read(@PathVariable Long id){
        Optional<Vendor> optional = repo.findById(id);
        if (optional.isEmpty()) {
            throw new RuntimeException();
        }
        return optional.get();
    }

    @PostMapping
    public ResponseEntity create(@RequestBody Vendor vendor) throws URISyntaxException {
        Logger.getInstance().info("vendor: " + vendor);
        Vendor savedDetail = repo.save(vendor);
        return ResponseEntity.created(new URI("/vendors/" + savedDetail.getId())).body(savedDetail);
    }

    @PutMapping("/{id}")
    public ResponseEntity update(@PathVariable Long id, @RequestBody Vendor vendor){
        Optional<Vendor> optional = repo.findById(id);
        if (optional.isEmpty()) {
            throw new RuntimeException();
        }
        Vendor curVendor = optional.get();
        curVendor.setContract(vendor.getContract());
        curVendor.setAddress(vendor.getAddress());
        curVendor.setDeliveryTime(vendor.getDeliveryTime());
        curVendor.setDiscount(vendor.getDiscount());
        curVendor.setGuarantee(vendor.getGuarantee());
        curVendor.setName(vendor.getName());
        curVendor.setPhoneNum(vendor.getPhoneNum());
        curVendor.setType(vendor.getType());;
        curVendor = repo.save(curVendor);
        return ResponseEntity.ok(curVendor);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity delete(@PathVariable Long id){
        repo.deleteById(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/type={typeId}/detail={detailId}")
    public List<Vendor> readByTypeAndDetail(@PathVariable Long typeId, @PathVariable Long detailId){
        Optional<List<Vendor>> optional = repo.findByTypeAndDetail(typeId, detailId);
        if (optional.isEmpty()) {
            throw new RuntimeException();
        }
        return optional.get();
    }

    @GetMapping("/detail={detailId}/count={count}/start={startDate}/end={endDate}")
    public List<Vendor> readByDetailCountAndPeriod(@PathVariable Long detailId,
                                                   @PathVariable Integer count,
                                                   @PathVariable String startDate,
                                                   @PathVariable String endDate)
    {

        Optional<List<Vendor>> optional = repo.findByDetailCountAndPeriod(detailId, count, Date.valueOf(startDate), Date.valueOf(endDate));
        if (optional.isEmpty()) {
            throw new RuntimeException();
        }
        return optional.get();
    }

    @GetMapping("/cheapest")
    public List<Vendor> readCheapestVendors(){
        Optional<List<Object[]>> optional = repo.findCheapestVendors();
        if (optional.isEmpty()) {
            throw new RuntimeException();
        }

        List<Vendor> result = new ArrayList<>();
        for (Object[] obj : optional.get()) {
            Vendor temp = new Vendor();
            temp.setId(((BigDecimal) obj[0]).longValue());
            temp.setName((String) obj[1]);
            temp.setAveragePrice((Float) obj[2]);
            result.add(temp);
        }
        return result;
    }

    @GetMapping("/part/detail={detail}")
    public List<Vendor> readByDetailPart(@PathVariable Long detail){
        Optional<List<Object[]>> optional = repo.findByDetailPart(detail);
        if (optional.isEmpty()) {
            throw new RuntimeException();
        }

        List<Vendor> result = new ArrayList<>();

        for (Object[] obj : optional.get()) {
            Vendor temp = new Vendor();
            temp.setId(((BigDecimal) obj[0]).longValue());
            temp.setName((String) obj[1]);
            temp.setPercents((Integer) obj[2]);
            temp.setPartAsMoney((Float) obj[3]);
            temp.setPartAsNum((Float) obj[4]);
            result.add(temp);
        }
        return result;
    }
}


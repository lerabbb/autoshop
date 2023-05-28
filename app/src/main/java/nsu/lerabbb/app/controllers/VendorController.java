package nsu.lerabbb.app.controllers;

import lombok.AllArgsConstructor;
import nsu.lerabbb.app.Logger;
import nsu.lerabbb.app.entities.Vendor;
import nsu.lerabbb.app.repo.VendorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
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

}


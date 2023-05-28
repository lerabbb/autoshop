package nsu.lerabbb.app.repo;

import nsu.lerabbb.app.entities.Order;
import nsu.lerabbb.app.entities.Vendor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface VendorRepository extends JpaRepository<Vendor, Long> {
    @Override
    @Query("SELECT o FROM Vendor o WHERE o.id = :id ORDER BY o.id DESC")
    Optional<Vendor> findById(@Param("id") Long id);

//    @Override
//    @Query("SELECT o FROM Vendor o WHERE o.id = :id ORDER BY o.id DESC")
//    List<Vendor> findAll();

    @Query("SELECT o FROM Order o WHERE o.vendor.id = ?1")
    Optional<List<Order>> findOrdersByVendor(Long vId);

    @Query("""
            SELECT d FROM Detail d JOIN d.orderContent oc JOIN oc.order o JOIN o.vendor v
            WHERE d.id = :detail AND v.type.id = :type
            """)
    Optional<List<Vendor>> findByTypeAndDetail(@Param("type") Long type, @Param("detail") Long detail);
}

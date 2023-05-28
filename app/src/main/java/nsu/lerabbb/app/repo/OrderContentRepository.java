package nsu.lerabbb.app.repo;

import nsu.lerabbb.app.entities.OrderContent;
import nsu.lerabbb.app.entities.keys.OrderContentId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface OrderContentRepository extends JpaRepository<OrderContent, OrderContentId> {

    @Query("SELECT o FROM OrderContent o WHERE o.order.id = ?1")
    Optional<List<OrderContent>> findContentByOrder(Long oId);

    @Query("SELECT o FROM OrderContent o WHERE o.order.id = :orderId AND o.detail.id = :detailId ORDER BY o.order.id,o.detail.id DESC")
    Optional<OrderContent> findById(@Param("orderId") Long orderId, @Param("detailId") Long detailId);

    @Query("SELECT o FROM OrderContent o WHERE o.order.id = :orderId ORDER BY o.order.id DESC")
    Optional<List<OrderContent>> findByOrder(@Param("orderId") Long orderId);

    @Modifying
    @Query("DELETE FROM OrderContent o WHERE o.order.id=:order_id AND o.detail.id=:detail_id")
    void deleteById(@Param("order_id") Long orderId, @Param("detail_id") Long detailId);
}

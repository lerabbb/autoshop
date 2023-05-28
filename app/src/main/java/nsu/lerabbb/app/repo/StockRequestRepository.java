package nsu.lerabbb.app.repo;

import nsu.lerabbb.app.entities.StockRequest;
import nsu.lerabbb.app.entities.keys.StockRequestId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface StockRequestRepository extends JpaRepository<StockRequest, StockRequestId> {

    @Query("SELECT sr FROM StockRequest sr WHERE sr.stockDetail.id=:stockDetailId AND sr.book.id=:bookId ORDER BY sr.stockDetail.id, sr.book.id DESC")
    Optional<StockRequest> findById(@Param("stockDetailId") Long stockDetailId, @Param("bookId") Long bookId);

    @Modifying
    @Query("DELETE FROM StockRequest sr WHERE sr.stockDetail.id=:stockDetailId AND sr.book.id=:bookId")
    void deleteById(@Param("stockDetailId") Long stockDetailId, @Param("bookId") Long bookId);
}

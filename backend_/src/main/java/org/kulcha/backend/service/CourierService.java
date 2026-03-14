package org.kulcha.backend.service;

import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.kulcha.backend.exception.CourierNotFoundException;
import org.kulcha.backend.model.Courier;
import org.kulcha.backend.repository.CourierRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class CourierService {

    private final CourierRepository courierRepository;

    @Transactional
    public Courier create(Courier courier) {
        return courierRepository.save(courier);
    }

    public Optional<Courier> findById(Long id) {
        return courierRepository.findById(id);
    }

    public Optional<Courier> findWithUserById(Long id) {
        return courierRepository.findWithUserById(id);
    }

    public Optional<Courier> findByUserIdDetailed(Long userId) {
        return courierRepository.findByUserIdDetailed(userId);
    }

    public List<Courier> findAll() {
        return courierRepository.findAll();
    }

    public List<Courier> findAllDetailed() {
        return courierRepository.findAllDetailed();
    }

    public boolean existsByUserId(Long userId) {
        return courierRepository.existsByUser_Id(userId);
    }

    @Transactional
    public Courier update(Long id, Courier updatedCourier) {
        Courier existingCourier = courierRepository.findById(id)
                .orElseThrow(() -> new CourierNotFoundException(id));

        existingCourier.setUser(updatedCourier.getUser());
        return courierRepository.save(existingCourier);
    }

    @Transactional
    public void deleteById(Long id) {
        courierRepository.deleteById(id);
    }

    public boolean existsById(Long id) {
        return courierRepository.existsById(id);
    }
}

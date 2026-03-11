package org.kulcha.backend.service;

import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.kulcha.backend.exception.StaffNotFoundException;
import org.kulcha.backend.model.Staff;
import org.kulcha.backend.model.enums.StaffPermission;
import org.kulcha.backend.repository.StaffRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class StaffService {

    private final StaffRepository staffRepository;

    @Transactional
    public Staff create(Staff staff) {
        return staffRepository.save(staff);
    }

    public Optional<Staff> findById(Long id) {
        return staffRepository.findById(id);
    }

    public Optional<Staff> findWithUserById(Long id) {
        return staffRepository.findWithUserById(id);
    }

    public List<Staff> findByUserIdDetailed(Long userId) {
        return staffRepository.findByUserIdDetailed(userId);
    }

    public List<Staff> findAll() {
        return staffRepository.findAll();
    }

    public List<Staff> findAllByRestaurantIdDetailed(Long restaurantId) {
        return staffRepository.findAllByRestaurantIdDetailed(restaurantId);
    }

    public List<Staff> findAllByPermissionDetailed(StaffPermission permission) {
        return staffRepository.findAllByPermissionDetailed(permission);
    }

    public boolean existsByUserAndRestaurantAndPermission(Long userId,
                                                          Long restaurantId,
                                                          StaffPermission permission) {
        return staffRepository.existsByUser_IdAndRestaurant_IdAndPermission(userId, restaurantId, permission);
    }

    @Transactional
    public Staff update(Long id, Staff updatedStaff) {
        Staff existingStaff = staffRepository.findById(id)
                .orElseThrow(() -> new StaffNotFoundException(id));

        existingStaff.setUser(updatedStaff.getUser());
        existingStaff.setRestaurant(updatedStaff.getRestaurant());
        existingStaff.setPermission(updatedStaff.getPermission());
        return staffRepository.save(existingStaff);
    }

    @Transactional
    public void deleteById(Long id) {
        staffRepository.deleteById(id);
    }

    public boolean existsById(Long id) {
        return staffRepository.existsById(id);
    }
}

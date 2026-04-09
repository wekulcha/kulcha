package org.kulcha.backend.service;

import java.util.List;
import lombok.RequiredArgsConstructor;
import org.kulcha.backend.model.Staff;
import org.kulcha.backend.model.enums.StaffPermission;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class StaffAccessService {

    private final StaffService staffService;

    public void requireRestaurantStaff(long dbUserId, long restaurantId) {
        List<Staff> list = staffService.findByUserIdDetailed(dbUserId);
        boolean ok = list.stream().anyMatch(s -> s.getRestaurant().getId().equals(restaurantId));
        if (!ok) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "No access to this restaurant");
        }
    }

    public void requireCanEditMenu(long dbUserId, long restaurantId) {
        List<Staff> list = staffService.findByUserIdDetailed(dbUserId);
        boolean ok = list.stream()
                .anyMatch(s -> s.getRestaurant().getId().equals(restaurantId)
                        && s.getPermission() == StaffPermission.CAN_EDIT_MENU);
        if (!ok) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Cannot edit menu for this restaurant");
        }
    }
}

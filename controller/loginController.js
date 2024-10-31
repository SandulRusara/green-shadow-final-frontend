$(document).ready(function() {
    // Add a new fields input field when the "Add filed" button is clicked
    $('#addLogFieldButton').on('click', function() {
        // Create a new input field for an additional fields entry
        const newLogInput = $('<div class="input-group mt-2"><input type="text" class="form-control" placeholder="Enter fields Id"><button type="button" class="btn btn-danger removeLogButton">Remove</button></div>');

        // Append the new input field to the additionalLogs container
        $('#additionalLogField').append(newLogInput);
    });

    // Remove a log input field when the "Remove" button is clicked
    $('#additionalLogField').on('click', '.removeLogButton', function() {
        $(this).closest('.input-group').remove(); // Remove the parent input group
    });

    // Add a new crops input field when the "Add crop" button is clicked
    $('#addLogCropButton').on('click', function() {
        // Create a new input field for an additional crops entry
        const newLogInput = $('<div class="input-group mt-2"><input type="text" class="form-control" placeholder="Enter fields Id"><button type="button" class="btn btn-danger removeLogButton">Remove</button></div>');

        // Append the new input field to the additionalLogs container
        $('#additionalLogCrop').append(newLogInput);
    });

    // Remove a log input field when the "Remove" button is clicked
    $('#additionalLogCrop').on('click', '.removeLogButton', function() {
        $(this).closest('.input-group').remove(); // Remove the parent input group
    });

    // Add a new staff input field when the "Add crop" button is clicked
    $('#addLogStaffButton').on('click', function() {
        // Create a new input field for an additional staff member entry
        const newLogInput = $('<div class="input-group mt-2"><input type="text" class="form-control" placeholder="Enter staff member"><button type="button" class="btn btn-danger removeLogButton">Remove</button></div>');

        // Append the new input field to the additionalLogs container
        $('#additionalLogStaff').append(newLogInput);
    });

    // Remove a log input field when the "Remove" button is clicked
    $('#additionalLogStaff').on('click', '.removeLogButton', function() {
        $(this).closest('.input-group').remove(); // Remove the parent input group
    });

// Update button click ----------------------------------------------------------------------------------------
    $('.card .btn-success').on('click', function () {
        // Get the card's current data
        const card = $(this).closest('.card');
        const logCode = card.find('.card-log-code').text().replace('Log Code:', '').trim();
        const logDate = card.find('.card-log-date').text().replace('Log Date:', '').trim();
        const logDetails = card.find('.card-log-details').text().replace('Log Details:', '').trim();
        const field = card.find('.card-log-fields').text().replace('Field:', '').trim();
        const crop = card.find('.card-log-crop').text().replace('Crop:', '').trim();
        const staff = card.find('.card-log-staff').text().replace('Staff:', '').trim();

        // Set data in modal fields
        $('#updateLogCode').val(logCode);
        $('#updateLogDate').val(logDate);
        $('#updateLog-details').val(logDetails);

        // Set field, crop and staff values
        const fieldArray = field.split(',');
        const cropArray = crop.split(',');
        const staffArray = staff.split(',');

        $('#updateLogFieldId').empty(); // Clear existing values in field input
        $('#updateLogCropId').empty(); // Clear existing values in crop input
        $('#updateLogStaffId').empty(); // Clear existing values in staff input

        fieldArray.forEach(filedItem => {
            $('#updateLogFieldId').append(`<input type="text" class="form-control mb-2" value="${filedItem.trim()}">`);
        });

        cropArray.forEach(cropItem => {
            $('#updateLogCropId').append(`<input type="text" class="form-control mb-2" value="${cropItem.trim()}">`);
        });

        staffArray.forEach(staffItem => {
            $('#updateLogStaffId').append(`<input type="text" class="form-control mb-2" value="${staffItem.trim()}">`);
        });


        // Show the update modal
        const updateModal = new bootstrap.Modal($('#updateMonitoringLogModal')[0]);
        updateModal.show();
    });

// Submit update form
    $('#updateLogForm').on('submit', function (event) {
        event.preventDefault();
        // Perform update logic, close modal, etc.

        // Close the modal after processing
        const updateModal = bootstrap.Modal.getInstance($('#updateMonitoringLogModal')[0]);
        updateModal.hide();
    });

    //delete modal ----------------------------------------------------------------------------------------
    let cardToDelete; // Variable to store the card to be deleted

    // Show confirmation modal when the delete button is clicked
    $('.card .btn-danger').on('click', function() {
        cardToDelete = $(this).closest('.card'); // Store the card element to be deleted
        const confirmModal = new bootstrap.Modal($('#confirmLogDeleteModal')[0]);
        confirmModal.show();
    });

    // Delete the card if "Yes" is clicked in the confirmation modal
    $('#confirmLogDeleteButton').on('click', function() {
        if (cardToDelete) {
            cardToDelete.remove(); // Remove the card element from the DOM
            cardToDelete = null; // Reset the variable
        }
        $('#confirmLogDeleteModal').modal('hide'); // Hide the confirmation modal
    });
});
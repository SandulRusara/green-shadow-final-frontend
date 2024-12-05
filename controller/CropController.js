import {LoadFieldCard} from './FieldController.js';

$('#newCropButton').on('click',function (){
    clearAddModal();
});

// SAVE CROP
$('#cropForm').on('submit', function (e) {
    e.preventDefault();

    // Retrieve form values
    let cropName = $('#cropName').val();
    let scientificName = $('#crop-scientificName').val();
    let category = $('#crop-Category').val();
    let season = $('#crop-season').val();
    let fieldIds = [];

    // Collect all field IDs from the main select and additional fields
    $('#crop-FieldId').val() && fieldIds.push($('#crop-FieldId').val()); // Add main select value if not empty
    $('#additionalField select').each(function () {
        let fields = $(this).val();
        fieldIds.push(fields);
    });

    // Remove empty values (if any)
    fieldIds = fieldIds.filter(id => ({ fieldCode: id }));

    let cropImageFile = $('#cropImageInput')[0].files[0];

    const formData = new FormData();
    formData.append("cropName", cropName);
    formData.append("scientificName", scientificName);
    formData.append("category", category);
    formData.append("season", season);
    formData.append("cropImage", cropImageFile);
    formData.append("fieldList", new Blob([JSON.stringify(fieldIds)], { type: "application/json" }));

    Swal.fire({
        title: "Do you want to save the changes?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Save",
        denyButtonText: `Don't save`
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                url: "http://localhost:5058/greenShadowBackend/api/v1/crops",
                type: "POST",
                data: formData,
                processData: false,
                contentType: false,
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('jwtToken')
                },
                success: function (response) {
                    $('#cropForm')[0].reset();
                    $('#previewCrop').addClass('d-none');
                    $('#newCropModal').modal('hide');
                    let loadCard = new LoadCards();
                    loadCard.loadAllCropCard();
                    Swal.fire("Saved!", "", "success");
                },
                error: function (xhr, status, error) {
                    alert("Faild crop");
                }
            });
        } else if (result.isDenied) {
            Swal.fire("Changes are not saved", "", "info");
        }
    });
});

// Function to add dynamic field dropdown in the add modal
$('#addFieldButton').on('click', function() {
    let fieldCard = new LoadFieldCard();
    fieldCard.loadAllFieldCard().then(fieldCodes => {
        addDropdownUpdate('#additionalField', '#crop-FieldId', fieldCodes);
    }).catch(error => {
        console.error("Error loading field cards:", error);
    });
});

$('#cropImageInput').on('click',function (){
    previewCropImage("#cropImageInput","#previewCropImg");
});

$('#updateCropImage').on('click',function (){
    previewCropImage("#updateCropImage","#updatePreview");
});

// Preview image in modal when file input changes
function previewCropImage(imageInputId,imgPreviewId){
    $(`${imageInputId}`).on('change', function(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                $(`${imgPreviewId}`).attr('src', e.target.result).removeClass('d-none').show(); // Remove d-none and display the image
            };
            reader.readAsDataURL(file);
        } else {
            $(`${imgPreviewId}`).addClass('d-none');
        }
    });
}

// SET CARD DATA UPDATE MODAL
$('#cropCard').on('click', '.update-button', function() {
    const card = $(this).closest('.card');
    $('#selectedCropCode').val(card.find('.card-cropCode').text().replace('Code:', '').trim());
    $('#updateCropName').val(card.find('.card-name').text().replace('Name:', '').trim());
    $('#updateScientificName').val(card.find('.card-scientific').text().replace('Scientific Name: ', '').trim());
    $('#updateCategory').val(card.find('.card-category').text().replace('Category: ', ''));
    $('#updateCropSeason').val(card.find('.card-season').text().replace('Crop Season: ', ''));
    $('#updatePreview').attr('src', card.find('.image-preview').attr('src')).removeClass('d-none');
    $('#cropImageInput').val('');
    $('#updateFieldModalButton').data('card-id', card);
    $('#updateCropModal').modal('show');
});

//add additional combo box in update modal
function addDropdownUpdate(containerId, selectClass, options) {
    const $container = $('<div class="d-flex align-items-center mt-2"></div>');
    const $select = $('<select id="optionSelect" class="form-control me-2 text-white" style="background-color:#2B2B2B"></select>').addClass(selectClass);

    // Populate select options
    options.forEach(option => $select.append(`<option value="${option}" class="text-white">${option}</option>`));

    // Remove button
    const $removeBtn = $('<button class="btn btn-danger">Remove</button>');
    $removeBtn.on('click', function() {
        $container.remove();
    });

    $container.append($select).append($removeBtn);
    $(containerId).append($container);
}

//CROP CARD UPDATE
$('#updateFieldModalButton').on('click',async function (){
    let cropCode = $('#selectedCropCode').val();
    let cropName = $('#updateCropName').val();
    let scientificName = $('#updateScientificName').val();
    let category = $('#updateCategory').val();
    let season = $('#updateCropSeason').val();
    let cropImage = $('#updateCropImage')[0].files[0];

    const formData = new FormData();
    formData.append("cropName", cropName);
    formData.append("scientificName", scientificName);
    formData.append("category", category);
    formData.append("season", season);

    if (!cropImage) {
        const previewImage = $('#updatePreview').attr('src');
        if (previewImage) {
            try {
                const response = await fetch(previewImage);
                const blob = await response.blob();
                formData.append("cropImage", blob);
            } catch (error) {
                Swal.fire('Error', 'Failed to process the image. Please try again.', 'error');
                return;
            }
        } else {
            Swal.fire('Error', 'No image provided!', 'error');
            return;
        }
    }else {
        formData.append("cropImage", cropImage);
    }

    Swal.fire({
        title: "Do you want to update the changes?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Update",
        denyButtonText: `Don't update`
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                url: `http://localhost:5058/greenShadowBackend/api/v1/crops/${cropCode}`,
                type: "PUT",
                data: formData,
                processData: false,
                contentType: false,
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('jwtToken')
                },
                success: function (response) {
                    $('#updateCropForm')[0].reset();
                    $('#previewCrop').addClass('d-none');
                    $('#additionalLogInCropUpdate').empty();
                    $('#additionalFieldInCropUpdate').empty();
                    $('#updateCropModal').modal('hide');
                    let loadAllCrops = new LoadCards();
                    loadAllCrops.loadAllCropCard();
                    Swal.fire("Updated!", "", "success");
                },
                error: function (xhr, status, error) {
                    Swal.fire("Faild crop", "", "info");
                }
            });
        } else if (result.isDenied) {
            Swal.fire("Changes are not saved", "", "info");
        }
    });
});

function populateDropdownCrop(container, selectedValues, options) {
    $(container).empty();
    selectedValues.forEach(value => {
        // Create a wrapper div for each dropdown and the remove button
        const dropdownWrapper = $('<div class="dropdown-wrapper mb-3" style="display: flex; align-items: center;"></div>');

        // Create the dropdown
        const dropdown = $('<select class="form-control me-2 text-white" style="background-color:#2B2B2B"></select>');
        options.forEach(option => {
            dropdown.append(`<option value="${option}" ${option.trim() === value ? 'selected' : ''}>${option}</option>`);
        });

        // Create the remove button
        const removeButton = $('<button type="button" class="btn btn-danger ml-2">Remove</button>');

        // Add click event to remove the dropdown when the button is clicked
        removeButton.click(function() {
            dropdownWrapper.remove();
        });

        // Append dropdown and remove button to the wrapper
        dropdownWrapper.append(dropdown);
        dropdownWrapper.append(removeButton);

        // Append the wrapper to the container
        $(container).append(dropdownWrapper);
    });
}

// Show the confirmation modal and set the card ID to delete
$(document).ready(function() {
    $(document).on('click', '.delete-button', function () {
        const cardId = $(this).data('card-id');
        $('#confirmCropDeleteButton').data('card-id', cardId);
        $('#confirmCropDeleteModal').modal('show');
    });
    $('#confirmCropDeleteButton').on('click', function () {
        const cardId = $(this).data('card-id');
        $.ajax({
            url: `http://localhost:5058/greenShadowBackend/api/v1/crops/${cardId}`,
            type: 'DELETE',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('jwtToken')
            },
            success: function () {
                const loadCropCard = new LoadCards();
                loadCropCard.loadAllCropCard();
                Swal.fire('Deleted!', 'The crop has been deleted.', 'success');
            },
            error: function (xhr, status, error) {
                console.error("Error deleting crop:", error);
                if (xhr.status === 404) {
                    Swal.fire('Error', 'Crop not found!', 'error');
                } else if (xhr.status === 400) {
                    Swal.fire('Error', 'Invalid crop ID!', 'error');
                } else {
                    Swal.fire('Error', 'Failed to delete crop. Please try again.', 'error');
                }
            }
        });
        $('#confirmCropDeleteModal').modal('hide');
    });
    $('#confirmCropDeleteModal').on('hidden.bs.modal', function () {
        $('body').removeClass('modal-open');
        $('.modal-backdrop').remove();
    });
});

export class LoadCards {
    loadAllCropCard() {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: "http://localhost:5058/greenShadowBackend/api/v1/crops",
                type: "GET",
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('jwtToken')
                },
                success: function (crops) {
                    $("#cropCard").empty();
                    const cropCodes = crops.map(crop => crop.cropCode);
                    // Loop through each crop and create a card
                    crops.forEach((crop, index) => {
                        let imageData = `data:image/jpeg;base64,${crop.cropImage}`;
                        let newCard = `
                        <div class="col-md-6 col-lg-4 mb-4" id="card${crop.cropCode}">
                            <div class="card text-white" data-card-code="${crop.cropCode}" style="background-color: #2b2b2b; border: 1px solid gray;">
                                <div class="card-image-container">
                                    <img src="${imageData}" class="card-img-top image-preview" alt="Crop Image">
                                </div>
                                <div class="card-body">
                                    <h5 class="card-title">Crop Details</h5>
                                    <p class="card-cropCode"><strong>Code:</strong> ${crop.cropCode}</p>
                                    <p class="card-name"><strong>Name:</strong> ${crop.cropName}</p>
                                    <p class="card-scientific"><strong>Scientific Name:</strong> ${crop.scientificName}</p>
                                    <p class="card-category"><strong>Category:</strong> ${crop.category}</p>
                                    <p class="card-season"><strong>Crop Season:</strong> ${crop.season}</p>
                                    <p class="card-FieldId"><strong>Field ID:</strong> ${crop.fieldCodeList.join(', ')}</p>
                                    <p class="card-logs"><strong>Logs:</strong>${crop.logCodeList.join(', ')}</p>
                                    <div class="d-flex justify-content-between">
                                        <button class="btn btn-success flex-grow-1 me-2 update-button" data-card-id="card${crop.cropCode}">Update</button>
                                        <button class="btn btn-danger flex-grow-1 delete-button" data-bs-toggle="modal" data-card-id="${crop.cropCode}" data-bs-target="#confirmCropDeleteModal">Delete</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `;
                        $("#cropCard").append(newCard);
                    });
                    resolve(cropCodes);
                },
                error: function (xhr, status, error) {
                    alert("Failed to retrieve crops");
                    reject(error);
                }
            });
        });
    }
}

function clearAddModal(){
    $('#cropName, #crop-scientificName, #crop-Category,#crop-season').val(''); // Clear input fields
    $('#previewCropImg').hide().attr('src', '');
    $('#cropImageInput').val('');
    $('#additionalField').empty();
}


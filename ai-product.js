// This script provides functionality for the AI Product Generator page.
document.addEventListener('DOMContentLoaded', () => {

    // --- UI Elements ---
    const stepUpload = document.getElementById('step-upload');
    const stepGenerated = document.getElementById('step-generated');
    const stepSaved = document.getElementById('step-saved');
    const contentContainer = document.getElementById('content-container');
    const uploadForm = document.getElementById('upload-form');
    const generatedListing = document.getElementById('generated-listing');
    const savedState = document.getElementById('saved-state');
    const generateBtn = document.getElementById('generate-btn');
    const saveBtn = document.getElementById('save-btn');
    const editBtn = document.getElementById('edit-btn');
    const createAnotherBtn = document.getElementById('create-another-btn');
    const languageSelector = document.getElementById('language-selector');
    const backBtn = document.getElementById('back-btn');

    // --- Form Elements ---
    const imageUploadInput = document.getElementById('image-upload');
    const roughDescriptionTextarea = document.getElementById('rough-description');
    const categorySelect = document.getElementById('category-select');
    const imagePreviewDiv = document.getElementById('image-preview');
    const imageUploadText = document.getElementById('image-upload-text');
    const imagePreviewImg = imagePreviewDiv.querySelector('img');

    // --- Generated Content Display ---
    const generatedTitle = document.getElementById('generated-title');
    const generatedDescription = document.getElementById('generated-description');
    const generatedPrice = document.getElementById('generated-price');
    const generatedHashtags = document.getElementById('generated-hashtags');

    // --- Helper Functions ---
    const showStep = (step) => {
        // Reset all steps and content
        [stepUpload, stepGenerated, stepSaved].forEach(el => el.classList.remove('active'));
        [uploadForm, generatedListing, savedState].forEach(el => el.classList.remove('active'));

        // Activate the selected step and content
        if (step === 'upload') {
            stepUpload.classList.add('active');
            uploadForm.classList.add('active');
        } else if (step === 'generated') {
            stepUpload.classList.add('active');
            stepGenerated.classList.add('active');
            generatedListing.classList.add('active');
        } else if (step === 'saved') {
            stepUpload.classList.add('active');
            stepGenerated.classList.add('active');
            stepSaved.classList.add('active');
            savedState.classList.add('active');
        }
    };

    const generateListing = () => {
        const productData = {
            image: imagePreviewImg.src,
            description: roughDescriptionTextarea.value,
            category: categorySelect.value,
            language: languageSelector.value
        };

        // Simulating an AI API call
        const aiResponse = {
            title: "Exquisite Handcrafted Ceramic Mug",
            description: "This beautiful, one-of-a-kind mug is handcrafted from local clay and fired in a traditional kiln. Its unique finish and ergonomic design make it perfect for your morning coffee or evening tea.",
            price: "$35.00",
            hashtags: ["#HandmadePottery", "#CeramicMug", "#ArtisanCraft", "#PotteryLove", "#SmallBusiness"]
        };

        generatedTitle.textContent = aiResponse.title;
        generatedDescription.textContent = aiResponse.description;
        generatedPrice.textContent = aiResponse.price;

        generatedHashtags.innerHTML = '';
        aiResponse.hashtags.forEach(tag => {
            const span = document.createElement('span');
            span.className = 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800';
            span.textContent = tag;
            generatedHashtags.appendChild(span);
        });

        // Hide spinner and show the generated content
        generateBtn.classList.remove('generating');
        document.getElementById('generate-spinner').classList.add('hidden');
        showStep('generated');
    };

    // --- Event Listeners ---
    imageUploadInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                imagePreviewImg.src = e.target.result;
                imagePreviewDiv.classList.remove('hidden');
            };
            reader.readAsDataURL(file);
        }
    });

    generateBtn.addEventListener('click', () => {
        // Show spinner and change button text
        generateBtn.classList.add('generating');
        document.getElementById('generate-spinner').classList.remove('hidden');
        
        // Simulate a delay for the AI generation
        setTimeout(generateListing, 1500);
    });

    saveBtn.addEventListener('click', () => {
        saveBtn.classList.add('saving');
        document.getElementById('save-spinner').classList.remove('hidden');
        
        setTimeout(() => {
            saveBtn.classList.remove('saving');
            document.getElementById('save-spinner').classList.add('hidden');
            showStep('saved');
        }, 1500);
    });

    editBtn.addEventListener('click', () => {
        showStep('upload');
    });

    createAnotherBtn.addEventListener('click', () => {
        // Reset form and UI
        imageUploadInput.value = '';
        roughDescriptionTextarea.value = '';
        imagePreviewDiv.classList.add('hidden');
        showStep('upload');
    });

    backBtn.addEventListener('click', () => {
        // This would typically navigate back to the dashboard or previous page
        alert("Navigating back to the dashboard.");
    });
});
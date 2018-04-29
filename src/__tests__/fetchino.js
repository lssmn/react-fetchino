import React from 'react';
import { shallow, mount } from 'enzyme';
import Fetchino from '../fetchino';

describe('Fetchino', () => {
  let wrapper = null;
  
  const mockError = 'Error!';
  
  const mockProps = {
    url: 'https://fake',
    options: {},
  };

  beforeEach(() => {
    fetch.resetMocks();
  });
  
  describe('Initialisation', () => {
    
    it('should not fetch the request with no props', () => {
      console.error = jest.fn();

      wrapper = shallow(<Fetchino />);

      expect(fetch).toHaveBeenCalledTimes(0);
      expect(console.error).toHaveBeenCalledTimes(1);
    });

    it('should fetch the request with props', () => {
      console.error = jest.fn();

      wrapper = shallow(<Fetchino {...mockProps} />);

      expect(fetch).toHaveBeenCalledTimes(1);
      expect(console.error).toHaveBeenCalledTimes(0);
    });

    it('should set the correct state', () => {
      wrapper = shallow(<Fetchino {...mockProps} />);

      expect(wrapper.state().loading).toEqual(true);
      expect(wrapper.state().error).toEqual(null);
      expect(wrapper.state().data).toEqual(null);
    });

  });

  describe('Error handling', () => {
    
    beforeEach(() => {
      fetch.mockReject(mockError);
      
      wrapper = shallow(<Fetchino {...mockProps} />);
    });

    it('should fetch the request', () => {
      expect(fetch).toHaveBeenCalledTimes(1);
      expect(fetch).toHaveBeenCalledWith(mockProps.url, {});
    });
    
    it('should set the correct state', () => {    
      expect(wrapper.state().loading).toEqual(false);
      expect(wrapper.state().error).toEqual(mockError);
      expect(wrapper.state().data).toEqual(null);
    });
    
  });

  describe('Data handling', () => {
    const mockResponse = {
      test: []
    };
    
    beforeEach(() => {
      fetch.mockResponse(JSON.stringify(mockResponse));

      wrapper = shallow(<Fetchino {...mockProps} />);
    });

    it('should fetch the request', () => {
      expect(fetch).toHaveBeenCalledTimes(1);
      expect(fetch).toHaveBeenCalledWith(mockProps.url, {});
    });

    it('should set the correct state', () => {
      expect(wrapper.state().loading).toEqual(false);
      expect(wrapper.state().error).toEqual(null);
      expect(wrapper.state().data).toEqual(mockResponse);
    });
    
  });
  
  describe('Updating', () => {
    
    const mockResponse = {
      test: []
    };
    
    beforeEach(() => {
      fetch.mockResponse(JSON.stringify(mockResponse));
      
      wrapper = mount(<Fetchino {...mockProps} />);
    });
    
    it('should not update with no props', () => {
      wrapper = shallow(<Fetchino />);

      const spyOnFetch = jest.spyOn(wrapper.instance(), 'fetch');
      
      wrapper.update();
      
      expect(wrapper.state().loading).toBeTruthy();
      expect(wrapper.state().data).toBeFalsy();
      expect(wrapper.state().error).toBeFalsy();
      expect(spyOnFetch).not.toHaveBeenCalled();
    });
    
    it('should not update with empty props', () => {
      wrapper = shallow(<Fetchino url={''} options={{}} />);
      
      const spyOnFetch = jest.spyOn(wrapper.instance(), 'fetch');
      
      wrapper.update();
      
      expect(wrapper.state().loading).toBeTruthy();
      expect(wrapper.state().data).toBeFalsy();
      expect(wrapper.state().error).toBeFalsy();
      expect(spyOnFetch).not.toHaveBeenCalled();
    });
    
    it('should update only on certain conditions', () => {
      const spyOnFetch = jest.spyOn(wrapper.instance(), 'fetch');
      
      wrapper.update();
      
      expect(wrapper.state().loading).toBeFalsy();
      expect(wrapper.state().data).toBeTruthy();
      expect(wrapper.state().error).toBeFalsy();
      expect(spyOnFetch).not.toHaveBeenCalled();
      
      wrapper.setProps({
        url: 'fake'
      });
      
      expect(wrapper.state().loading).toBeTruthy();
      expect(wrapper.state().data).toBeFalsy();
      expect(wrapper.state().error).toBeFalsy();
      expect(spyOnFetch).toHaveBeenCalled();
    });
    
    it('should call getDerivedStateFromProps with the correct parameters', () => {
      const spyOnGetDerivedStateFromProps = jest.spyOn(Fetchino, 'getDerivedStateFromProps');

      const nextProps = {
        url: 'fake'
      };
      
      wrapper.setProps(nextProps);
      
      expect(spyOnGetDerivedStateFromProps.mock.calls[0][0]).toEqual({
        ...nextProps,
        options: {}
      });
      
      expect(spyOnGetDerivedStateFromProps.mock.calls[0][1]).toEqual({
        ...mockProps,
        loading: false,
        error: null,
        data: mockResponse,
        options: {}
      });
    
    });
    
    it('should return the correct state', () => {
      const prevState = {
        loading: true,
        error: null,
        data: null,
      };
      
      const nextProps = {
        url: 'test',
        options: {},
      };
      
      expect(Fetchino.getDerivedStateFromProps(nextProps, prevState)).toEqual({
        data: null,
        error: null,
        loading: true,
        url: nextProps.url,
        options: nextProps.options,
      });
      
      expect(Fetchino.getDerivedStateFromProps(nextProps, { ...nextProps })).toEqual(null);
    });
    
  });
  
  describe('Rendering', () => {
    const mockResponse = {
      test: []
    };
    
    beforeEach(() => {
      fetch.mockResponse(JSON.stringify(mockResponse));
      
      wrapper = shallow(<Fetchino {...mockProps} />);
    });
    
    it('should return null with no props', () => {
      wrapper = shallow(<Fetchino />);

      expect(wrapper.html()).toEqual(null);
    });
    
    it('should return null with empty props', () => {
      wrapper = shallow(<Fetchino url={''} options={''} render={''} />);

      expect(wrapper.html()).toEqual(null);
    });
    
    it('should return null when it does not have children', () => {
      expect(wrapper.html()).toEqual(null);
    });
    
    it('should pass the correct props to the children', () => {
      const children = jest.fn();

      wrapper.setProps({ children });

      expect(children).toHaveBeenCalledWith({
        data: mockResponse, 
        error: null,
        loading: false,
      });
    });
    
    it('should accept render as well as children', () => {
      const render = jest.fn();
      
      wrapper.setProps({ render });
      
      expect(render).toHaveBeenCalledWith({
        data: mockResponse, 
        error: null,
        loading: false
      });
    });
    
    it('should render children if both render and children functions', () => {
      const render = jest.fn();
      const children = jest.fn();
      
      wrapper.setProps({ render, children });
      
      expect(render).not.toHaveBeenCalled();
      expect(children).toHaveBeenCalled();
      expect(children).toHaveBeenCalledWith({
        data: mockResponse, 
        error: null,
        loading: false
      });
    });
    
  });

  describe('Composition', () => {
    const mockResponse = {
      test: [{ prop: 1 }, { prop: 2 }, { prop: 3 }],
    };
    
    function LoadingComponent() {
      return <span>Loading...</span>;
    }
  
    function ErrorComponent({ message }) {
      return <span>{message}</span>;
    }
  
    function DataComponent({ data }) {
      return <span>{data.name}</span>;
    }
    
    function createComponent() {
      return (
        <Fetchino url="https://fake">
          {({ loading, error, data }) => (
            <React.Fragment>
              { loading && <LoadingComponent /> }
              { error && <ErrorComponent message={error} /> }
              { data && <DataComponent data={data} /> }
            </React.Fragment>
          )}
        </Fetchino>
      );
    }
    
    describe('Loading', () => {

      it('should render the LoadingComponent', () => {     
        wrapper = shallow(createComponent());
        
        expect(wrapper.find(LoadingComponent)).toHaveLength(1);
        expect(wrapper.find(ErrorComponent)).toHaveLength(0);
        expect(wrapper.find(DataComponent)).toHaveLength(0);
      });
      
    });
    
    describe('ErrorComponent', () => {

      beforeEach(() => {
        fetch.mockReject(mockError);
        
        wrapper = mount(createComponent());
      });
  
      it('should render the ErrorComponent', () => {
        wrapper.update();

        expect(wrapper.find(LoadingComponent)).toHaveLength(0);
        expect(wrapper.find(ErrorComponent)).toHaveLength(1);
        expect(wrapper.find(DataComponent)).toHaveLength(0);
      });
      
    });
    
    describe('DataComponent', () => {

      beforeEach(() => {
        fetch.mockResponse(JSON.stringify(mockResponse));
      
        wrapper = mount(createComponent());
      });
      
      it('should render the DataComponent', () => {
        wrapper.update();

        expect(wrapper.find(LoadingComponent)).toHaveLength(0);
        expect(wrapper.find(ErrorComponent)).toHaveLength(0);
        expect(wrapper.find(DataComponent)).toHaveLength(1);
      });
    
    });
  
  });

});
